import { getCollection } from '@/content/collections'
import {
  coloringBook,
  featuredSlug,
  portfolioWorks,
  type PortfolioArt,
  type PortfolioCategory,
} from '@/content/portfolio'
import type { Locale, WorkLanguage } from '@/lib/i18n'
import { term, type WorkFacts } from '@/lib/work-facts'
import { getWorkBySlug } from '@/lib/works'

export type ShelfEntry = {
  slug: string
  year: string
  category: PortfolioCategory
  categoryName: string
  title: string
  bookTitle: string
  art: PortfolioArt
  tagline: string
  description: string
  reader: string
  facts: WorkFacts
  enTitle: string
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
    year: entry.year,
    category: entry.category,
    categoryName: collection.name[locale],
    title: work.title[locale],
    bookTitle: formatWorkTitle(locale, work.title[locale]),
    art: entry.art,
    tagline: entry.tagline[locale],
    description: work.description[locale],
    facts: work.facts,
    reader: `${term('kind', work.facts.kind, locale)} · ${term('ageBand', work.facts.ageBand, locale)}`,
    enTitle: work.title.en,
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
