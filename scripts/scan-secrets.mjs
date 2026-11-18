#!/usr/bin/env node
/**
 * Secret scanner: blocks provider keys, custom credentials, and server-only env
 * names from tracked files, staged changes, any reachable commit, and the
 * browser bundle. Dependency-free on purpose.
 *
 *   node scripts/scan-secrets.mjs            tracked files
 *   node scripts/scan-secrets.mjs --staged   lines added to the index
 *   node scripts/scan-secrets.mjs --history  lines added in any reachable commit
 *   node scripts/scan-secrets.mjs --bundle   built browser output (needs .next/static)
 *
 * Exit codes: 0 clean, 1 findings, 2 setup error. Matched values are never
 * printed; findings name the location and the rule only. See README
 * "Secret handling".
 */

import { execFileSync, spawn } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import { createInterface } from 'node:readline'

const MIN_ENTROPY = 3.0
const GIT_MAX_BUFFER = 64 * 1024 * 1024
const RAW_MAX_BUFFER = 16 * 1024 * 1024
/**
 * Shortest line that can hold a finding is 13 characters: the public env
 * prefix plus one character.
 */
const MIN_LINE_LENGTH = 13

const PROVIDER_PATTERNS = [
  ['Resend API key', /\bre_[A-Za-z0-9]{24,}\b/g],
  ['OpenAI/Anthropic key', /\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}\b/g],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{30,})\b/g],
  ['AWS access key id', /\bAKIA[0-9A-Z]{16}\b/g],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g],
  ['Stripe secret key', /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ['Private key block', /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/g],
  ['JWT', /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g],
]

/** Uppercase env-style assignment, e.g. SUBSCRIBE_CONFIRM_SECRET=... */
const ENV_ASSIGNMENT = new RegExp(
  String.raw`\b([A-Z][A-Z0-9_]*(?:KEY|SECRET|TOKEN|PASSWORD|PASSWD|_PAT)[A-Z0-9_]*)\s*[:=]\s*["']?([A-Za-z0-9_+/=-]{24,})["']?`,
  'g',
)

/** Quoted literal assigned to a lower-case identifier, e.g. const apiKey = '...' */
const QUOTED_ASSIGNMENT =
  /\b(?:api[_-]?key|secret|token|password|passwd)\b\s*[:=]\s*["']([A-Za-z0-9_+/=-]{32,})["']/gi

const PUBLIC_ENV_TOKEN = /NEXT_PUBLIC_[A-Z0-9_]+/g
const PROCESS_ENV = /process\.env\.([A-Za-z_][A-Za-z0-9_]*)/g

const PUBLIC_ENV_ALLOWLIST = new Set(['NEXT_PUBLIC_TURNSTILE_SITE_KEY'])

const SERVER_SECRET_NAMES = new Set([
  'RESEND_API_KEY',
  'RESEND_CONTACTS_API_KEY',
  'SUBSCRIBE_CONFIRM_SECRET',
  'TURNSTILE_SECRET_KEY',
  'VERCEL_OIDC_TOKEN',
])

// A server secret may only be read under these prefixes. A helper outside them
// that genuinely needs one: add its prefix here, do not widen the rule.
const SERVER_ENV_ALLOWED_PREFIXES = ['app/api/']

const BUNDLE_CANDIDATE_NAMES = [
  'RESEND_API_KEY',
  'RESEND_CONTACTS_API_KEY',
  'SUBSCRIBE_CONFIRM_SECRET',
  'TURNSTILE_SECRET_KEY',
  'VERCEL_OIDC_TOKEN',
]

const SKIP_VALUE_PREFIXES = [
  'process.env',
  '<',
  '${',
  '{{',
  'canary-',
  'test-',
  'example-',
  'changeme',
  'placeholder',
]

/** Cloudflare's published always-pass and always-block test keys. */
const CLOUDFLARE_TEST_KEY = /^[123]x0{10,}/

const SKIP_SEGMENTS = new Set(['node_modules', '.next', 'playwright-report', 'test-results'])
const SKIP_ROOT_PREFIXES = ['public/', 'assets/']
const SKIP_BASENAMES = new Set(['pnpm-lock.yaml'])
const SKIP_SUFFIXES = ['.tsbuildinfo']
const CLIENT_MODULE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx'])
const BUNDLE_EXTENSIONS = new Set(['.js', '.css', '.json', '.txt'])
const SERVER_PAGE_EXTENSIONS = new Set(['.html', '.rsc'])

class SetupError extends Error {}

let mode = 'tracked'
const findings = []
const seen = new Set()

function add(key, text) {
  if (seen.has(key)) return
  seen.add(key)
  findings.push(text)
}

function shannonEntropy(value) {
  const counts = new Map()
  for (const char of value) counts.set(char, (counts.get(char) ?? 0) + 1)
  let entropy = 0
  for (const count of counts.values()) {
    const p = count / value.length
    entropy -= p * Math.log2(p)
  }
  return entropy
}

function plausibleSecret(value) {
  if (value.length < 16) return false
  const lower = value.toLowerCase()
  for (const prefix of SKIP_VALUE_PREFIXES) if (lower.startsWith(prefix)) return false
  if (CLOUDFLARE_TEST_KEY.test(value)) return false
  if (new Set(value).size <= 1) return false
  return shannonEntropy(value) >= MIN_ENTROPY
}

function isPublicKey(key) {
  return key.startsWith('NEXT_PUBLIC_') || key === 'TURNSTILE_SITE_KEY'
}

function eachMatch(re, text, visit) {
  re.lastIndex = 0
  let match
  while ((match = re.exec(text)) !== null) {
    if (match[0].length === 0) {
      re.lastIndex += 1
      continue
    }
    visit(match)
  }
}

function lineOf(content, index) {
  let line = 1
  for (let i = 0; i < index && i < content.length; i += 1) {
    if (content[i] === '\n') line += 1
  }
  return line
}

function normalizePath(path) {
  return path.replace(/^\.\//, '')
}

function isSkippedPath(path) {
  const normalized = normalizePath(path)
  const segments = normalized.split('/')
  if (segments.slice(0, -1).some((segment) => SKIP_SEGMENTS.has(segment))) return true
  if (SKIP_ROOT_PREFIXES.some((prefix) => normalized.startsWith(prefix))) return true
  const base = segments.at(-1) ?? ''
  if (SKIP_BASENAMES.has(base)) return true
  return SKIP_SUFFIXES.some((suffix) => base.endsWith(suffix))
}

function isBinary(content) {
  return content.subarray(0, 8192).includes(0)
}

function scanLine(file, lineNo, text, commit) {
  if (text.length < MIN_LINE_LENGTH) return
  const where = commit ? `${commit}  ${file}:${lineNo}` : `${file}:${lineNo}`

  for (const [name, pattern] of PROVIDER_PATTERNS) {
    eachMatch(pattern, text, (match) => {
      if (!plausibleSecret(match[0])) return
      add(`${where} ${name}`, `${where}  ${name}`)
    })
  }

  eachMatch(ENV_ASSIGNMENT, text, (match) => {
    const key = match[1]
    if (isPublicKey(key)) return
    if (!plausibleSecret(match[2])) return
    add(`${where} credential ${key}`, `${where}  credential assignment ${key}`)
  })

  eachMatch(QUOTED_ASSIGNMENT, text, (match) => {
    const value = match[1]
    if (!/[0-9A-Z]/.test(value)) return
    if (!plausibleSecret(value)) return
    add(`${where} quoted credential`, `${where}  quoted credential literal`)
  })

  eachMatch(PUBLIC_ENV_TOKEN, text, (match) => {
    const token = match[0]
    if (PUBLIC_ENV_ALLOWLIST.has(token)) return
    add(`${where} public env ${token}`, `${where}  public env not allowlisted: ${token}`)
  })
}

function fileRules(file, content, commit) {
  const normalized = normalizePath(file)
  const allowedPath = SERVER_ENV_ALLOWED_PREFIXES.some((prefix) => normalized.startsWith(prefix))
  const clientModule =
    CLIENT_MODULE_EXTENSIONS.has(extname(normalized)) &&
    /['"]use client['"]/.test(content.slice(0, 200))

  eachMatch(PROCESS_ENV, content, (match) => {
    const name = match[1]
    const line = lineOf(content, match.index)
    const where = commit ? `${commit}  ${file}:${line}` : `${file}:${line}`

    if (clientModule && name !== 'NODE_ENV' && !name.startsWith('NEXT_PUBLIC_')) {
      add(`${where} client ${name}`, `${where}  client module reads server env ${name}`)
    }
    if (SERVER_SECRET_NAMES.has(name) && !allowedPath) {
      add(`${where} path ${name}`, `${where}  server secret outside app/api: ${name}`)
    }
  })
}

function scanTrackedFile(relativePath) {
  if (isSkippedPath(relativePath)) return
  let buffer
  try {
    buffer = readFileSync(relativePath)
  } catch (error) {
    if (error.code === 'ENOENT') return
    throw new SetupError(`cannot read ${relativePath}: ${error.message}`)
  }
  if (isBinary(buffer)) return
  const content = buffer.toString('utf8')
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i += 1) scanLine(relativePath, i + 1, lines[i], null)
  fileRules(relativePath, content, null)
}

function gitLines(args) {
  return execFileSync('git', ['-c', 'core.quotePath=false', ...args], {
    encoding: 'utf8',
    maxBuffer: GIT_MAX_BUFFER,
  })
}

function parsePlusPath(raw) {
  let path = raw.slice(4)
  if (path.startsWith('"') && path.endsWith('"')) path = path.slice(1, -1)
  if (path === '/dev/null') return null
  if (path.startsWith('b/')) path = path.slice(2)
  return path
}

/** Shared `git diff` / `git log -p` parser: scans added lines only. */
class DiffScanner {
  constructor() {
    this.commit = null
    this.file = null
    this.lineNo = 0
    this.inHunk = false
  }

  feed(raw) {
    if (raw.startsWith('__COMMIT__')) {
      this.commit = raw.slice('__COMMIT__'.length, '__COMMIT__'.length + 7) || null
      this.file = null
      this.inHunk = false
      return
    }
    if (raw.startsWith('@@')) {
      const header = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(raw)
      this.inHunk = header !== null && this.file !== null
      this.lineNo = header ? Number(header[1]) : 0
      return
    }
    if (raw.startsWith('diff --git ')) {
      this.file = null
      this.inHunk = false
      return
    }
    if (!this.inHunk) {
      if (raw.startsWith('+++ ')) this.file = parsePlusPath(raw)
      return
    }
    if (this.file === null) return
    const kind = raw[0]
    if (kind === '+') {
      scanLine(this.file, this.lineNo, raw.slice(1), this.commit)
      this.lineNo += 1
      return
    }
    if (kind === '-') return
    if (kind === '\\') return
    this.lineNo += 1
  }
}

function runTracked() {
  const files = execFileSync('git', ['-c', 'core.quotePath=false', 'ls-files', '-z'], {
    encoding: 'utf8',
    maxBuffer: GIT_MAX_BUFFER,
  })
    .split('\0')
    .filter(Boolean)
  for (const file of files) scanTrackedFile(file)
}

function stagedIndexContent(path) {
  try {
    const buffer = execFileSync('git', ['show', `:${path}`], { maxBuffer: RAW_MAX_BUFFER })
    return isBinary(buffer) ? null : buffer.toString('utf8')
  } catch (error) {
    throw new SetupError(`cannot read staged ${path}: ${error.message}`)
  }
}

function runStaged() {
  const diff = gitLines(['diff', '--cached', '--unified=0', '--no-color'])
  const scanner = new DiffScanner()
  for (const line of diff.split('\n')) scanner.feed(line)

  const staged = gitLines(['diff', '--cached', '--name-only', '--diff-filter=d', '-z'])
    .split('\0')
    .filter(Boolean)
  for (const path of staged) {
    if (isSkippedPath(path)) continue
    if (!CLIENT_MODULE_EXTENSIONS.has(extname(path))) continue
    const content = stagedIndexContent(path)
    if (content === null) continue
    fileRules(path, content, null)
  }
}

async function runHistory() {
  const child = spawn(
    'git',
    ['-c', 'core.quotePath=false', 'log', '--all', '-p', '--no-color', '--format=__COMMIT__%H'],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  )
  let stderr = ''
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', (chunk) => {
    stderr += chunk
  })
  const code = new Promise((resolve, reject) => {
    child.on('error', reject)
    child.on('close', resolve)
  })
  const scanner = new DiffScanner()
  const reader = createInterface({ input: child.stdout, crlfDelay: Infinity })
  for await (const line of reader) {
    try {
      scanner.feed(line)
    } catch (error) {
      if (error instanceof SetupError) throw error
      throw new SetupError(`history scan failed: ${error.message}`)
    }
  }
  const status = await code
  if (status !== 0) throw new SetupError(`git log failed (exit ${status}): ${stderr.trim()}`)
}

function readEnvLocal() {
  const values = new Map()
  if (!existsSync('.env.local')) return values
  let raw
  try {
    raw = readFileSync('.env.local', 'utf8')
  } catch (error) {
    throw new SetupError(`cannot read .env.local: ${error.message}`)
  }
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (trimmed === '' || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (value.length >= 2 && value[0] === value.at(-1) && (value[0] === '"' || value[0] === "'")) {
      value = value.slice(1, -1)
    }
    values.set(key, value)
  }
  return values
}

function walkFiles(root, extensions, out = []) {
  if (!existsSync(root)) return out
  let entries
  try {
    entries = readdirSync(root, { withFileTypes: true })
  } catch (error) {
    throw new SetupError(`cannot read ${root}: ${error.message}`)
  }
  for (const entry of entries) {
    const full = join(root, entry.name)
    if (entry.isDirectory()) walkFiles(full, extensions, out)
    else if (extensions.has(extname(entry.name))) out.push(full)
  }
  return out
}

function bundleCandidates() {
  const local = readEnvLocal()
  const candidates = []
  for (const name of BUNDLE_CANDIDATE_NAMES) {
    const value = process.env[name] ?? local.get(name)
    if (value && value.length >= 16) candidates.push([name, value])
  }
  return candidates
}

function runBundle() {
  if (!existsSync('.next/static')) {
    throw new SetupError('--bundle needs a build: .next/static is missing, run pnpm run build')
  }
  const candidates = bundleCandidates()
  if (candidates.length === 0) {
    throw new SetupError(
      `--bundle needs at least one of ${BUNDLE_CANDIDATE_NAMES.join(', ')} in the environment or .env.local`,
    )
  }
  const files = [
    ...walkFiles('.next/static', BUNDLE_EXTENSIONS),
    ...walkFiles('.next/server/app', SERVER_PAGE_EXTENSIONS),
  ]
  for (const file of files) {
    let content
    try {
      content = readFileSync(file, 'utf8')
    } catch (error) {
      throw new SetupError(`cannot read ${file}: ${error.message}`)
    }
    const display = normalizePath(file)
    for (const [name, value] of candidates) {
      if (content.includes(value)) add(`${display} ${name} leak`, `${display}  ${name} leak`)
    }
    for (const [name, pattern] of PROVIDER_PATTERNS) {
      let hit = false
      eachMatch(pattern, content, (match) => {
        if (!hit && plausibleSecret(match[0])) hit = true
      })
      if (hit) add(`${display} ${name}`, `${display}  ${name}`)
    }
  }
}

function parseMode() {
  const flags = process.argv.slice(2).filter((arg) => arg.startsWith('--'))
  const known = new Set(['--staged', '--history', '--bundle'])
  const unknown = flags.filter((flag) => !known.has(flag))
  if (unknown.length > 0) throw new SetupError(`unknown flag: ${unknown.join(', ')}`)
  if (flags.length > 1) throw new SetupError('pass exactly one mode flag')
  if (flags.includes('--staged')) return 'staged'
  if (flags.includes('--history')) return 'history'
  if (flags.includes('--bundle')) return 'bundle'
  return 'tracked'
}

function finish() {
  if (findings.length > 0) process.stdout.write(`${findings.join('\n')}\n`)
  const label = mode === 'bundle' ? 'leaks' : 'findings'
  process.stdout.write(`${findings.length} ${label}\n`)
  process.exitCode = findings.length > 0 ? 1 : 0
}

async function main() {
  try {
    mode = parseMode()
    if (mode === 'bundle') runBundle()
    else if (mode === 'history') await runHistory()
    else if (mode === 'staged') runStaged()
    else runTracked()
  } catch (error) {
    const message = error instanceof SetupError ? error.message : (error?.stack ?? String(error))
    process.stderr.write(`scan-secrets: ${message}\n`)
    process.exitCode = 2
    return
  }
  finish()
}

await main()
