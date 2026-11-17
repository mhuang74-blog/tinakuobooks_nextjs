import { renderAtom } from '@/lib/feed'
import { getTranslatedWorks } from '@/lib/works'
import { getAuthor } from '@/content/authors'
import { absoluteUrl, SITE_DESCRIPTION_EN, SITE_TITLE_EN } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const entries = getTranslatedWorks().map((work) => ({
    title: work.title.en,
    description: work.description.en,
    url: absoluteUrl(`/en/works/${work.slugEn}`),
    date: work.date,
    authorName: getAuthor(work.authorId).name.en,
  }))

  const body = renderAtom({
    title: SITE_TITLE_EN,
    subtitle: SITE_DESCRIPTION_EN,
    siteUrl: absoluteUrl('/en'),
    feedUrl: absoluteUrl('/en/feed.xml'),
    language: 'en',
    entries,
  })

  return new Response(body, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  })
}
