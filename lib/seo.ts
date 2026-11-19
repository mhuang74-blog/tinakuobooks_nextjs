import type { Metadata } from 'next'
import { getAuthor, type Author } from '@/content/authors'
import type { Collection } from '@/content/collections'
import { collectionHref, authorHref, type Locale } from '@/lib/i18n'
import { absoluteUrl, SITE_TITLE_EN, SITE_TITLE_ZH } from '@/lib/site'
import { workOgImage, type Work } from '@/lib/works'

export type AlternatePaths = {
  zh?: string
  en?: string
  xDefault?: string
}

type MetadataInput = {
  locale: Locale
  title: string
  description: string
  path: string
  alternates?: AlternatePaths
  type?: 'website' | 'article'
  image?: { url: string; alt: string }
  keywords?: string[]
  publishedTime?: string
  authors?: string[]
  section?: string
  noindex?: boolean
}

export function buildMetadata(input: MetadataInput): Metadata {
  const types: Record<string, string> =
    input.locale === 'zh'
      ? {
          'application/atom+xml': '/feed.xml',
          'application/rss+xml': '/atom.xml',
        }
      : { 'application/atom+xml': '/en/feed.xml' }

  const languages: Record<string, string> = {}
  if (input.alternates?.zh) languages['zh-Hant'] = input.alternates.zh
  if (input.alternates?.en) languages.en = input.alternates.en
  languages['x-default'] =
    input.alternates?.xDefault ?? input.alternates?.zh ?? input.path

  const image = {
    url: input.image?.url ?? '/og/home.jpg',
    width: 1200,
    height: 630,
    alt: input.image?.alt ?? input.title,
  }

  const shared = {
    title: input.title,
    description: input.description,
    url: input.path,
    images: [image],
  }

  const openGraph: Metadata['openGraph'] =
    input.type === 'article'
      ? {
          ...shared,
          type: 'article',
          siteName: input.locale === 'zh' ? SITE_TITLE_ZH : SITE_TITLE_EN,
          publishedTime: input.publishedTime,
          authors: input.authors,
          section: input.section,
        }
      : {
          ...shared,
          type: 'website',
          siteName: input.locale === 'zh' ? SITE_TITLE_ZH : SITE_TITLE_EN,
        }

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: input.path,
      languages,
      types,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image.url],
    },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

export function workPath(work: Work, locale: Locale): string {
  return locale === 'en' ? `/en/works/${work.slugEn}` : `/${work.slug}`
}

export function workAlternates(work: Work): AlternatePaths {
  return {
    zh: `/${work.slug}`,
    en: work.slugEn ? `/en/works/${work.slugEn}` : undefined,
    xDefault: `/${work.slug}`,
  }
}

export function workImage(work: Work) {
  return { url: workOgImage(work.cover), alt: work.title.zh }
}

export function websiteJsonLd(locale: Locale) {
  const title = locale === 'zh' ? SITE_TITLE_ZH : SITE_TITLE_EN
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    url: absoluteUrl(locale === 'zh' ? '/' : '/en'),
    inLanguage: locale === 'zh' ? 'zh-Hant' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/works')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function workJsonLd(work: Work, locale: Locale) {
  const { illustrator, coAuthors, playwrights, yearOnly } = work.publication
  const person = (name: string) => ({ '@type': 'Person', name })
  const primary = person(getAuthor(work.authorId).name[locale])
  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh'
  const translationUrl =
    locale === 'zh'
      ? work.slugEn
        ? absoluteUrl(`/en/works/${work.slugEn}`)
        : undefined
      : absoluteUrl(`/${work.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title[locale],
    description: work.description[locale],
    datePublished: yearOnly ? work.date.slice(0, 4) : work.date,
    inLanguage: locale === 'zh' ? 'zh-Hant' : 'en',
    url: absoluteUrl(workPath(work, locale)),
    image: absoluteUrl(workOgImage(work.cover)),
    author: playwrights?.map(person) ?? (coAuthors ? [primary, ...coAuthors.map(person)] : primary),
    contributor: playwrights ? primary : undefined,
    illustrator: illustrator ? person(illustrator) : undefined,
    workTranslation: translationUrl
      ? {
          '@type': 'CreativeWork',
          url: translationUrl,
          inLanguage: otherLocale === 'zh' ? 'zh-Hant' : 'en',
        }
      : undefined,
  }
}

export function collectionJsonLd(collection: Collection, works: Work[], locale: Locale) {
  const href = collectionHref(locale, collection.id)
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name[locale],
    description: collection.description[locale],
    url: absoluteUrl(href),
    inLanguage: locale === 'zh' ? 'zh-Hant' : 'en',
    hasPart: works
      .filter((work) => (locale === 'en' ? work.slugEn !== '' : true))
      .map((work) => ({
        '@type': 'CreativeWork',
        name: work.title[locale],
        url: absoluteUrl(locale === 'en' ? `/en/works/${work.slugEn}` : `/${work.slug}`),
      })),
  }
}

export function authorJsonLd(author: Author, works: Work[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absoluteUrl(authorHref(locale, author.id)),
    inLanguage: locale === 'zh' ? 'zh-Hant' : 'en',
    mainEntity: {
      '@type': 'Person',
      name: author.name[locale],
      description: author.bio[locale],
      image: absoluteUrl(author.picture),
    },
    hasPart: works
      .filter((work) => (locale === 'en' ? work.slugEn !== '' : true))
      .map((work) => ({
        '@type': 'CreativeWork',
        name: work.title[locale],
        url: absoluteUrl(locale === 'en' ? `/en/works/${work.slugEn}` : `/${work.slug}`),
      })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
