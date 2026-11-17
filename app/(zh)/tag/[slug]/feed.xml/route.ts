import { notFound } from 'next/navigation'
import { renderAtom } from '@/lib/feed'
import { collections, getCollection, isCollectionId } from '@/content/collections'
import { getWorksByCollection } from '@/lib/works'
import { getAuthor } from '@/content/authors'
import { absoluteUrl, SITE_TITLE_ZH } from '@/lib/site'
import { collectionHref } from '@/lib/i18n'

export const dynamic = 'force-static'
export const dynamicParams = false

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return collections.map((collection) => ({ slug: collection.id }))
}

export async function GET(_request: Request, context: { params: Promise<Params> }) {
  const { slug } = await context.params
  if (!isCollectionId(slug)) notFound()

  const collection = getCollection(slug)
  const works = getWorksByCollection(slug)

  const body = renderAtom({
    title: `${collection.name.zh} | ${SITE_TITLE_ZH}`,
    subtitle: collection.description.zh,
    siteUrl: absoluteUrl(collectionHref('zh', slug)),
    feedUrl: absoluteUrl(`${collectionHref('zh', slug)}feed.xml`),
    language: 'zh-Hant',
    entries: works.map((work) => ({
      title: work.title.zh,
      description: work.description.zh,
      url: absoluteUrl(`/${work.slug}`),
      date: work.date,
      authorName: getAuthor(work.authorId).name.zh,
    })),
  })

  return new Response(body, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  })
}
