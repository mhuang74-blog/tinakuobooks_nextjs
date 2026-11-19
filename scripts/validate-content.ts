import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { isCollectionId } from '@/content/collections'
import { isAuthorId } from '@/content/authors'
import { isWorkLanguage } from '@/lib/i18n'
import { coloringBook, featuredSlug, portfolioWorks } from '@/content/portfolio'
import { getAllWorks, getWorkBySlug } from '@/lib/works'

const ROOT = process.cwd()
const WORKS_ROOT = path.join(ROOT, 'content', 'works')
const ZH_DIR = path.join(WORKS_ROOT, 'zh')
const EN_DIR = path.join(WORKS_ROOT, 'en')

const errors: string[] = []
const warnings: string[] = []

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const MARKDOWN = /\.md$/

function listMarkdown(directory: string): string[] {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory).filter((file) => MARKDOWN.test(file)).sort()
}

function isValidDate(value: unknown): boolean {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value)
}

function checkBody(label: string, body: string): void {
  if (body.includes('<!--more-->')) errors.push(`${label}: body still contains <!--more-->`)
  if (body.includes('assets/images/')) errors.push(`${label}: body references assets/images/`)
}

const zhFiles = listMarkdown(ZH_DIR)
const enFiles = listMarkdown(EN_DIR)

if (zhFiles.length === 0) errors.push('content/works/zh is empty')

const enByLegacySlug = new Map(enFiles.map((file) => [file.replace(MARKDOWN, ''), file]))

const seenSlugEn = new Map<string, string>()

for (const file of zhFiles) {
  const legacySlug = file.replace(MARKDOWN, '')
  const label = `content/works/zh/${file}`
  const parsed = matter(fs.readFileSync(path.join(ZH_DIR, file), 'utf8'))
  const data = parsed.data as Record<string, unknown>

  if (typeof data.title !== 'string' || !data.title.trim()) errors.push(`${label}: missing title`)
  if (typeof data.description !== 'string' || !data.description.trim()) {
    errors.push(`${label}: missing description`)
  }
  if (!isValidDate(data.date)) errors.push(`${label}: invalid or missing date (${String(data.date)})`)
  if (typeof data.author !== 'string' || !isAuthorId(data.author)) {
    errors.push(`${label}: unknown author (${String(data.author)})`)
  }
  if (typeof data.collection !== 'string' || !isCollectionId(data.collection)) {
    errors.push(`${label}: unknown collection (${String(data.collection)})`)
  }
  if (!Array.isArray(data.languages) || data.languages.length === 0) {
    errors.push(`${label}: missing languages`)
  } else {
    const seenLanguages = new Set<string>()
    for (const code of data.languages) {
      if (typeof code !== 'string' || !isWorkLanguage(code)) {
        errors.push(`${label}: unknown language (${String(code)})`)
      } else if (seenLanguages.has(code)) {
        errors.push(`${label}: duplicate language ${code}`)
      } else {
        seenLanguages.add(code)
      }
    }
  }
  if (typeof data.cover !== 'string' || !data.cover.startsWith('/')) {
    errors.push(`${label}: cover must be an absolute public path`)
  } else if (!fs.existsSync(path.join(ROOT, 'public', data.cover))) {
    errors.push(`${label}: cover file not found in public: ${data.cover}`)
  }
  if (data.slug !== undefined) errors.push(`${label}: Chinese works must not define a slug`)

  checkBody(label, parsed.content)

  const enFile = enByLegacySlug.get(legacySlug)
  if (!enFile) {
    warnings.push(`${label}: no English translation yet (slugEn empty)`)
    continue
  }

  const enLabel = `content/works/en/${enFile}`
  const enParsed = matter(fs.readFileSync(path.join(EN_DIR, enFile), 'utf8'))
  const enData = enParsed.data as Record<string, unknown>
  const slugEn = typeof enData.slug === 'string' ? enData.slug.trim() : ''

  if (!slugEn) errors.push(`${enLabel}: missing slug`)
  else if (!SLUG_PATTERN.test(slugEn)) errors.push(`${enLabel}: invalid slug (${slugEn})`)
  else {
    const duplicate = seenSlugEn.get(slugEn)
    if (duplicate) errors.push(`${enLabel}: duplicate slug ${slugEn} (also in ${duplicate})`)
    else seenSlugEn.set(slugEn, label)
  }

  if (typeof enData.title !== 'string' || !enData.title.trim()) {
    errors.push(`${enLabel}: missing title`)
  }
  if (typeof enData.description !== 'string' || !enData.description.trim()) {
    errors.push(`${enLabel}: missing description`)
  }
  if (!enParsed.content.trim()) warnings.push(`${enLabel}: English body is empty`)

  checkBody(enLabel, enParsed.content)
}

for (const enFile of enFiles) {
  const legacySlug = enFile.replace(MARKDOWN, '')
  if (!zhFiles.includes(`${legacySlug}.md`)) {
    warnings.push(`content/works/en/${enFile}: no matching Chinese work`)
  }
}

const works = getAllWorks()
const pending = works.filter((work) => work.translationPending)

if (portfolioWorks.length !== 16) {
  errors.push(`content/portfolio.ts: expected 16 portfolio works, found ${portfolioWorks.length}`)
}

const seenPortfolioSlug = new Set<string>()

for (const entry of portfolioWorks) {
  const label = `content/portfolio.ts: ${entry.slug}`

  if (seenPortfolioSlug.has(entry.slug)) errors.push(`${label}: duplicate slug`)
  seenPortfolioSlug.add(entry.slug)

  const work = getWorkBySlug(entry.slug)
  if (!work) {
    errors.push(`${label}: no matching work in content/works/zh`)
  } else {
    if (entry.category !== work.collectionId) {
      errors.push(
        `${label}: category ${entry.category} does not match collection ${work.collectionId}`,
      )
    }
    if (!work.preview.zh.trim() || (!work.translationPending && !work.preview.en.trim())) {
      errors.push(`${label}: missing shelf preview`)
    }
  }

  if (!fs.existsSync(path.join(ROOT, 'public', entry.art.src))) {
    errors.push(`${label}: art not found in public: ${entry.art.src}`)
  }
}

if (!seenPortfolioSlug.has(featuredSlug)) {
  errors.push(`content/portfolio.ts: featuredSlug ${featuredSlug} is not a portfolio work`)
}

const coloringWork = getWorkBySlug(coloringBook.slug)
if (!coloringWork) {
  errors.push(`content/portfolio.ts: coloring book work not found: ${coloringBook.slug}`)
}
if (!fs.existsSync(path.join(ROOT, 'public', coloringBook.art.src))) {
  errors.push(`content/portfolio.ts: coloring book art not found: ${coloringBook.art.src}`)
}
if (!fs.existsSync(path.join(ROOT, 'public', coloringBook.pdf))) {
  errors.push(`content/portfolio.ts: coloring book PDF not found: ${coloringBook.pdf}`)
}

for (const warning of warnings) console.warn(`warn  ${warning}`)
for (const error of errors) console.error(`error ${error}`)

console.log(
  `content: ${works.length} works, ${pending.length} translation-pending, portfolio: ${portfolioWorks.length} works, featured: ${featuredSlug}`,
)

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} error(s).`)
  process.exit(1)
}
