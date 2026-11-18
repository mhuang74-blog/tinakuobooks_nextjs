import fs from 'node:fs'
import path from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import matter from 'gray-matter'
import { isCollectionId } from '@/content/collections'
import { isAuthorId } from '@/content/authors'
import { isWorkLanguage } from '@/lib/i18n'
import { coloringBook, featuredSlug, portfolioWorks } from '@/content/portfolio'
import { workTerms, type WorkTermGroup } from '@/lib/work-facts'
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

type Fields = Record<string, unknown>

function isRecord(value: unknown): value is Fields {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function checkLocalizedFacts(label: string, data: Fields) {
  if (typeof data.statusNote !== 'string') errors.push(`${label}: invalid statusNote`)
  if (typeof data.contentNote !== 'string') errors.push(`${label}: invalid contentNote`)
  if (!isStringList(data.discussion) || data.discussion.length !== 2 ||
      data.discussion.some((question) => !question.trim())) {
    errors.push(`${label}: discussion must contain two non-empty questions`)
  }
}

function isTerm(group: WorkTermGroup, value: unknown) {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(workTerms[group], value)
}

function isOptionalCount(value: unknown) {
  return value === '' || (typeof value === 'number' && Number.isInteger(value) && value > 0)
}

function checkZhFacts(label: string, slug: string, data: Fields) {
  for (const key of ['kind', 'ageBand', 'format', 'printing', 'status'] as const) {
    if (!isTerm(key, data[key]) && !(data[key] === '' && (key === 'format' || key === 'printing'))) {
      errors.push(`${label}: invalid ${key}`)
    }
  }
  for (const key of ['publisher', 'isbn', 'series'] as const) {
    if (typeof data[key] !== 'string' ||
        (key === 'publisher' && !data[key].trim() && slug !== coloringBook.slug)) {
      errors.push(`${label}: invalid ${key}`)
    }
  }
  const precision = data.publishedPrecision
  if (typeof data.date !== 'string' ||
      (precision !== 'day' && precision !== 'month' && precision !== 'year') ||
      (precision === 'year' && !data.date.endsWith('-01-01')) ||
      (precision === 'month' && !data.date.endsWith('-01'))) {
    errors.push(`${label}: invalid publishedPrecision for date`)
  }
  if (!isOptionalCount(data.pages)) errors.push(`${label}: invalid pages`)
  if (!isOptionalCount(data.seriesPosition) || !isOptionalCount(data.seriesTotal) ||
      (data.seriesPosition === '') !== (data.seriesTotal === '') ||
      (typeof data.seriesPosition === 'number' && typeof data.seriesTotal === 'number' &&
       data.seriesPosition > data.seriesTotal)) {
    errors.push(`${label}: invalid seriesPosition or seriesTotal`)
  }
  if (!isStringList(data.awards)) errors.push(`${label}: invalid awards`)
  if (!Array.isArray(data.editions) || data.editions.some((edition) =>
    !isRecord(edition) || typeof edition.label !== 'string' ||
    !isValidDate(edition.date) || typeof edition.note !== 'string')) {
    errors.push(`${label}: invalid editions`)
  }
  const credits = data.credits
  if (!isRecord(credits) || !isTerm('role', credits.role) ||
      typeof credits.illustrator !== 'string' || typeof credits.adaptationSource !== 'string' ||
      !isStringList(credits.coAuthors) || !isStringList(credits.playwrights)) {
    errors.push(`${label}: invalid credits`)
  }
  checkLocalizedFacts(label, data)
}

function readCatalogue() {
  const source = fs.readFileSync(path.join(ROOT, 'docs/works-catalog.md'), 'utf8')
  const catalogue = new Map<string, Fields>()
  for (const [, yaml] of source.matchAll(/^```yaml\r?\n([\s\S]*?)^```$/gm)) {
    const entry = matter(`---\n${yaml}---\n`).data as Fields
    if (typeof entry.slug !== 'string' || catalogue.has(entry.slug)) {
      errors.push(`docs/works-catalog.md: missing or duplicate slug (${String(entry.slug)})`)
    } else {
      catalogue.set(entry.slug, entry)
    }
  }
  return catalogue
}

const catalogue = readCatalogue()

function checkCatalogueFacts(label: string, slug: string, data: Fields) {
  if (slug === coloringBook.slug) return
  const entry = catalogue.get(slug)
  if (!entry) {
    errors.push(`${label}: no matching catalogue entry`)
    return
  }

  const [format = '', pages = '', printing = ''] = String(entry.binding_pages).split(' / ')
  const position = Number(slug.match(/^(?:丁小飛校園日記|機器人宅急便)(\d)/)?.[1]) ||
    (entry.series === '動物星球偵探事件簿' ? (slug.startsWith('動物星球偵探事件簿2-') ? 2 : 1) : '')
  const total = position ? (entry.series === '丁小飛校園日記' ? 5 : 2) : ''
  const { credits, ...fields } = data
  const actual = isRecord(credits) ? credits : {}
  const editions = Array.isArray(fields.editions)
    ? fields.editions.map((edition) =>
        isRecord(edition) ? [edition.label, edition.date, edition.note] : edition)
    : fields.editions
  const checks: [string, unknown, unknown][] = [
    ['title', fields.title, entry.title_zh],
    ['date', fields.date, entry.date_precision === 'year' ? `${entry.first_published}-01-01` : entry.first_published],
    ['kind', fields.kind, entry.kind],
    ['ageBand', fields.ageBand, entry.age_band],
    ['publisher', fields.publisher, entry.publisher],
    ['publishedPrecision', fields.publishedPrecision, entry.date_precision],
    ['isbn', fields.isbn, entry.isbn],
    ['format', fields.format, format],
    ['pages', fields.pages, pages ? Number(pages.replace(' 頁', '')) : ''],
    ['printing', fields.printing, printing.split('（')[0]],
    ['series', fields.series, entry.series],
    ['seriesPosition', fields.seriesPosition, position],
    ['seriesTotal', fields.seriesTotal, total],
    ['status', fields.status, entry.status],
    ['awards', fields.awards, entry.awards],
    ['editions', editions, Array.isArray(entry.editions)
      ? entry.editions.map(({ label, date, note }) => [label, date, note]) : entry.editions],
    ['credits.role', actual.role, entry.role],
    ['credits.illustrator', actual.illustrator, isStringList(entry.illustrators) ? entry.illustrators[0] ?? '' : ''],
    ['credits.coAuthors', actual.coAuthors, entry.role === '合著' ? entry.contributors : []],
    ['credits.playwrights', actual.playwrights, entry.kind === '音樂劇' ? entry.contributors : []],
  ]
  for (const [key, value, expected] of checks) {
    if (!isDeepStrictEqual(value, expected)) {
      errors.push(`${label}: ${key} differs from catalogue (expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)})`)
    }
  }
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

  checkZhFacts(label, legacySlug, data)
  checkCatalogueFacts(label, legacySlug, data)
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
  if (enData.titleStatus !== 'verified-existing' && enData.titleStatus !== 'official' &&
      enData.titleStatus !== 'proposed') {
    errors.push(`${enLabel}: invalid titleStatus`)
  }
  checkLocalizedFacts(enLabel, enData)
  if (typeof data.statusNote === 'string' && data.statusNote.trim() &&
      typeof enData.statusNote === 'string' && !enData.statusNote.trim()) {
    errors.push(`${enLabel}: statusNote must translate the Chinese availability note`)
  }
  if ((enParsed.content.trim().match(/\S+/g)?.length ?? 0) < 50) {
    errors.push(`${enLabel}: English body must contain at least 50 words`)
  }

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
  } else if (entry.category !== work.collectionId) {
    errors.push(
      `${label}: category ${entry.category} does not match collection ${work.collectionId}`,
    )
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
