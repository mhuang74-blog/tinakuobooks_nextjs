import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { collections, getCollection, type CollectionId } from '@/content/collections'
import { authors, getAuthor, type AuthorId } from '@/content/authors'
import { seriesYearOrder } from '@/lib/work-order'
import {
  estimateReadingMinutes,
  isWorkLanguage,
  type Locale,
  type Localized,
  type WorkLanguage,
} from '@/lib/i18n'

export type { Locale, Localized }

export type WorkPublication = {
  kind?: string
  readers?: string
  yearOnly?: boolean
  illustrator?: string
  coAuthors?: string[]
  playwrights?: string[]
}

export type Work = {
  slug: string
  slugEn: string
  date: string
  authorId: AuthorId
  collectionId: CollectionId
  languages: WorkLanguage[]
  cover: string
  title: Localized<string>
  description: Localized<string>
  preview: Localized<string>
  body: Localized<string>
  readingMinutes: Localized<number>
  translationPending: boolean
  workingTitle: boolean
  publication: WorkPublication
}

const WORKS_ROOT = path.join(process.cwd(), 'content', 'works')
const MARKDOWN = /\.md$/

type ZhFrontMatter = WorkPublication & {
  title: string
  description: string
  preview?: string
  date: string
  author: AuthorId
  collection: CollectionId
  languages?: unknown
  cover: string
}

type EnFrontMatter = {
  title: string
  description: string
  preview?: string
  slug: string
  workingTitle?: boolean
}

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory).filter((file) => MARKDOWN.test(file)).sort()
}

function loadWorks(): Work[] {
  const zhDir = path.join(WORKS_ROOT, 'zh')
  const enDir = path.join(WORKS_ROOT, 'en')

  const enBySlug = new Map<string, string>()
  for (const file of readMarkdownFiles(enDir)) {
    enBySlug.set(file.replace(MARKDOWN, ''), path.join(enDir, file))
  }

  const works: Work[] = []

  for (const file of readMarkdownFiles(zhDir)) {
    const slug = file.replace(MARKDOWN, '')
    const zhParsed = matter(fs.readFileSync(path.join(zhDir, file), 'utf8'))
    const zh = zhParsed.data as ZhFrontMatter
    const languages = Array.isArray(zh.languages)
      ? zh.languages.filter(
          (code): code is WorkLanguage => typeof code === 'string' && isWorkLanguage(code),
        )
      : []
    const zhBody = zhParsed.content.trim()

    const enPath = enBySlug.get(slug)
    let en: EnFrontMatter | undefined
    let enBody = ''
    if (enPath) {
      const enParsed = matter(fs.readFileSync(enPath, 'utf8'))
      en = enParsed.data as EnFrontMatter
      enBody = enParsed.content.trim()
    }

    const slugEn = en?.slug?.trim() ?? ''
    const bodyEn = enBody || zhBody

    works.push({
      slug,
      slugEn,
      date: String(zh.date),
      authorId: zh.author,
      collectionId: zh.collection,
      // Every Work has a Chinese canonical edition; validation rejects missing or unknown codes.
      languages: languages.length > 0 ? languages : ['zh-Hant'],
      cover: String(zh.cover),
      title: {
        zh: String(zh.title),
        en: en?.title?.trim() || String(zh.title),
      },
      description: {
        zh: String(zh.description),
        en: en?.description?.trim() || String(zh.description),
      },
      preview: { zh: zh.preview ?? '', en: en?.preview ?? '' },
      body: { zh: zhBody, en: bodyEn },
      readingMinutes: {
        zh: estimateReadingMinutes(zhBody),
        en: estimateReadingMinutes(bodyEn),
      },
      translationPending: slugEn === '' || enBody === '',
      workingTitle: en?.workingTitle === true,
      publication: {
        kind: zh.kind,
        readers: zh.readers,
        yearOnly: zh.yearOnly,
        illustrator: zh.illustrator,
        coAuthors: zh.coAuthors,
        playwrights: zh.playwrights,
      },
    })
  }

  return works.sort(
    (a, b) =>
      seriesYearOrder(
        { date: a.date, title: a.title.zh },
        { date: b.date, title: b.title.zh },
      ) ||
      b.date.localeCompare(a.date) ||
      a.slug.localeCompare(b.slug, 'zh-Hant'),
  )
}

let cache: Work[] | null = null

export function getAllWorks(): Work[] {
  cache ??= loadWorks()
  return cache
}

export function getTranslatedWorks(): Work[] {
  return getAllWorks().filter((work) => work.slugEn !== '')
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find((work) => work.slug === slug)
}

export function getWorkBySlugEn(slugEn: string): Work | undefined {
  return getAllWorks().find((work) => work.slugEn === slugEn)
}

export function getWorksByCollection(id: CollectionId): Work[] {
  return getAllWorks().filter((work) => work.collectionId === id)
}

export function getWorksByAuthor(id: AuthorId): Work[] {
  return getAllWorks().filter((work) => work.authorId === id)
}

export function getNewerWork(work: Work): Work | undefined {
  const works = getAllWorks()
  const index = works.findIndex((candidate) => candidate.slug === work.slug)
  return index > 0 ? works[index - 1] : undefined
}

export function getOlderWork(work: Work): Work | undefined {
  const works = getAllWorks()
  const index = works.findIndex((candidate) => candidate.slug === work.slug)
  return index >= 0 && index < works.length - 1 ? works[index + 1] : undefined
}

export function getRelatedWorks(work: Work, limit = 3): Work[] {
  return getAllWorks()
    .filter(
      (candidate) =>
        candidate.collectionId === work.collectionId && candidate.slug !== work.slug,
    )
    .slice(0, limit)
}

export function workOgImage(cover: string): string {
  const base = path.parse(cover).name
  return `/og/${base}.jpg`
}

export { collections, getCollection, authors, getAuthor }
export type { CollectionId, AuthorId }
