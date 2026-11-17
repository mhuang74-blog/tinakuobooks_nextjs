import { notFound } from 'next/navigation'
import { renderAtom } from '@/lib/feed'
import { authors, getAuthor, isAuthorId } from '@/content/authors'
import { getWorksByAuthor } from '@/lib/works'
import { absoluteUrl, SITE_TITLE_ZH } from '@/lib/site'
import { authorHref } from '@/lib/i18n'

export const dynamic = 'force-static'
export const dynamicParams = false

type Params = { id: string }

export function generateStaticParams(): Params[] {
  return authors.map((author) => ({ id: author.id }))
}

export async function GET(_request: Request, context: { params: Promise<Params> }) {
  const { id } = await context.params
  if (!isAuthorId(id)) notFound()

  const author = getAuthor(id)
  const works = getWorksByAuthor(id)

  const body = renderAtom({
    title: `${author.name.zh} | ${SITE_TITLE_ZH}`,
    subtitle: author.bio.zh,
    siteUrl: absoluteUrl(authorHref('zh', id)),
    feedUrl: absoluteUrl(`${authorHref('zh', id)}feed.xml`),
    language: 'zh-Hant',
    entries: works.map((work) => ({
      title: work.title.zh,
      description: work.description.zh,
      url: absoluteUrl(`/${work.slug}`),
      date: work.date,
      authorName: author.name.zh,
    })),
  })

  return new Response(body, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  })
}
