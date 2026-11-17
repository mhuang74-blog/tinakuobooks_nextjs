import { renderAtom } from '@/lib/feed'
import { getAllWorks } from '@/lib/works'
import { getAuthor } from '@/content/authors'
import { absoluteUrl, SITE_DESCRIPTION_ZH, SITE_TITLE_ZH } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const entries = getAllWorks().map((work) => ({
    title: work.title.zh,
    description: work.description.zh,
    url: absoluteUrl(`/${work.slug}`),
    date: work.date,
    authorName: getAuthor(work.authorId).name.zh,
  }))

  const body = renderAtom({
    title: SITE_TITLE_ZH,
    subtitle: SITE_DESCRIPTION_ZH,
    siteUrl: absoluteUrl('/'),
    feedUrl: absoluteUrl('/feed.xml'),
    language: 'zh-Hant',
    entries,
  })

  return new Response(body, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  })
}
