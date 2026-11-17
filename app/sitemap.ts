import type { MetadataRoute } from 'next'
import { collections } from '@/content/collections'
import { authors } from '@/content/authors'
import { getAllWorks, getTranslatedWorks } from '@/lib/works'
import { absoluteUrl } from '@/lib/site'
import {
  authorHref,
  collectionHref,
} from '@/lib/i18n'

export const dynamic = 'force-static'

type Languages = Record<string, string>

function entry(
  path: string,
  languages: Languages | undefined,
  priority: number,
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: lastModified ? new Date(`${lastModified}T00:00:00+08:00`) : undefined,
    changeFrequency: 'monthly',
    priority,
    ...(languages
      ? {
          alternates: {
            languages: Object.fromEntries(
              Object.entries(languages).map(([key, value]) => [key, absoluteUrl(value)]),
            ),
          },
        }
      : {}),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const works = getAllWorks()
  const translated = getTranslatedWorks()
  const newest = works[0]?.date

  const entries: MetadataRoute.Sitemap = [
    entry('/', { 'zh-Hant': '/', en: '/en', 'x-default': '/' }, 1, newest),
    entry('/works', { 'zh-Hant': '/works', en: '/en/works', 'x-default': '/works' }, 0.9, newest),
    entry(
      '/collections',
      { 'zh-Hant': '/collections', en: '/en/collections', 'x-default': '/collections' },
      0.8,
      newest,
    ),
    entry('/about/', { 'zh-Hant': '/about/', en: '/en/about', 'x-default': '/about/' }, 0.6, newest),
    entry('/en', { 'zh-Hant': '/', en: '/en', 'x-default': '/' }, 0.9, newest),
    entry('/en/works', { 'zh-Hant': '/works', en: '/en/works', 'x-default': '/works' }, 0.8, newest),
    entry(
      '/en/collections',
      { 'zh-Hant': '/collections', en: '/en/collections', 'x-default': '/collections' },
      0.7,
      newest,
    ),
    entry('/en/about', { 'zh-Hant': '/about/', en: '/en/about', 'x-default': '/about/' }, 0.5, newest),
  ]

  for (const work of works) {
    const languages: Languages = { 'zh-Hant': `/${work.slug}`, 'x-default': `/${work.slug}` }
    if (work.slugEn) languages.en = `/en/works/${work.slugEn}`
    entries.push(entry(`/${work.slug}`, languages, 0.8, work.date))
  }

  for (const work of translated) {
    entries.push(
      entry(
        `/en/works/${work.slugEn}`,
        { 'zh-Hant': `/${work.slug}`, en: `/en/works/${work.slugEn}`, 'x-default': `/${work.slug}` },
        0.7,
        work.date,
      ),
    )
  }

  for (const collection of collections) {
    entries.push(
      entry(
        collectionHref('zh', collection.id),
        {
          'zh-Hant': collectionHref('zh', collection.id),
          en: collectionHref('en', collection.id),
          'x-default': collectionHref('zh', collection.id),
        },
        0.7,
        newest,
      ),
    )
    entries.push(
      entry(
        collectionHref('en', collection.id),
        {
          'zh-Hant': collectionHref('zh', collection.id),
          en: collectionHref('en', collection.id),
          'x-default': collectionHref('zh', collection.id),
        },
        0.6,
        newest,
      ),
    )
  }

  for (const author of authors) {
    entries.push(
      entry(
        authorHref('zh', author.id),
        {
          'zh-Hant': authorHref('zh', author.id),
          en: authorHref('en', author.id),
          'x-default': authorHref('zh', author.id),
        },
        0.6,
        newest,
      ),
    )
    entries.push(
      entry(
        authorHref('en', author.id),
        {
          'zh-Hant': authorHref('zh', author.id),
          en: authorHref('en', author.id),
          'x-default': authorHref('zh', author.id),
        },
        0.5,
        newest,
      ),
    )
  }

  entries.push(entry('/assets/files/57號小豹著色本.pdf', undefined, 0.5, '2021-03-07'))

  return entries
}
