import type { CollectionId } from '@/content/collections'
import type { Locale } from '@/lib/i18n'
import { workHref } from '@/lib/i18n'
import type { Work } from '@/lib/works'
import { getAuthor } from '@/content/authors'
import { getCollection } from '@/content/collections'
import { formatWorkTitle, getPortfolioArt } from '@/lib/portfolio'

export type WorkCardData = {
  slug: string
  href: string
  title: string
  bookTitle: string
  description: string
  art: { src: string; width: number; height: number }
  date: string
  year: string
  readingMinutes: number
  collectionId: CollectionId
  collectionName: string
  collectionAccent: string
  authorName: string
}

export function toWorkCardData(work: Work, locale: Locale): WorkCardData {
  const collection = getCollection(work.collectionId)
  const author = getAuthor(work.authorId)

  return {
    slug: work.slug,
    href: workHref(locale, work),
    title: work.title[locale],
    bookTitle: formatWorkTitle(locale, work.title[locale]),
    description: work.description[locale],
    art: getPortfolioArt(work.slug),
    date: work.date,
    year: work.date.slice(0, 4),
    readingMinutes: work.readingMinutes[locale],
    collectionId: work.collectionId,
    collectionName: collection.name[locale],
    collectionAccent: collection.accent,
    authorName: author.name[locale],
  }
}
