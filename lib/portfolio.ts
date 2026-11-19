import { getCollection } from '@/content/collections'
import {
  coloringBook,
  featuredSlug,
  portfolioWorks,
  type PortfolioArt,
  type PortfolioCategory,
} from '@/content/portfolio'
import { workHref, type Locale, type WorkLanguage } from '@/lib/i18n'
import { getWorkReadership } from '@/lib/work-publication'
import { getWorkBySlug } from '@/lib/works'

export type ShelfEntry = {
  slug: string
  href: string
  year: string
  category: PortfolioCategory
  categoryName: string
  title: string
  bookTitle: string
  art: PortfolioArt
  description: string
  preview: string
  reader: string
  languages: WorkLanguage[]
}

/**
 * Chinese titles are set book-style in running text; English titles are not.
 * This is the only place that adds the corner brackets.
 */
export function formatWorkTitle(locale: Locale, title: string): string {
  return locale === 'zh' ? `《${title}》` : title
}

export function toShelfEntry(slug: string, locale: Locale): ShelfEntry | null {
  const entry = portfolioWorks.find((candidate) => candidate.slug === slug)
  const work = getWorkBySlug(slug)
  if (!entry || !work) return null

  const collection = getCollection(entry.category)

  return {
    slug,
    href: workHref(locale, work),
    year: work.date.slice(0, 4),
    category: entry.category,
    categoryName: collection.name[locale],
    title: work.title[locale],
    bookTitle: formatWorkTitle(locale, work.title[locale]),
    art: entry.art,
    description: work.description[locale],
    preview: work.preview[locale],
    reader: getWorkReadership(work, locale),
    languages: work.languages,
  }
}

export function getShelfEntries(locale: Locale): ShelfEntry[] {
  return portfolioWorks.flatMap((entry) => {
    const shelf = toShelfEntry(entry.slug, locale)
    if (!shelf) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`Portfolio work not found in content/works: ${entry.slug}`)
      }
      return []
    }
    return [shelf]
  })
}

export function getFeaturedEntry(locale: Locale): ShelfEntry {
  const shelf = toShelfEntry(featuredSlug, locale)
  if (!shelf) throw new Error(`Featured work not found: ${featuredSlug}`)
  return shelf
}

export function getPortfolioArt(slug: string): PortfolioArt {
  const entry = portfolioWorks.find((candidate) => candidate.slug === slug)
  if (entry) return entry.art
  if (slug === coloringBook.slug) return coloringBook.art

  const work = getWorkBySlug(slug)
  return { src: work?.cover ?? '', width: 1200, height: 1200 }
}
