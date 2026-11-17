import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { WorksGrid } from '@/components/works-grid'
import { authors, getAuthor, isAuthorId } from '@/content/authors'
import { authorHref, homeHref, ui, worksHref } from '@/lib/i18n'
import { authorJsonLd, breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { FACEBOOK_URL } from '@/lib/site'
import { getWorksByAuthor } from '@/lib/works'

export const dynamicParams = false

const strings = ui.zh

type Params = { id: string }

export function generateStaticParams(): Params[] {
  return authors.map((author) => ({ id: author.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { id } = await params
  if (!isAuthorId(id)) return {}
  const author = getAuthor(id)

  return buildMetadata({
    locale: 'zh',
    title: author.name.zh,
    description: author.bio.zh,
    path: authorHref('zh', id),
    alternates: {
      zh: authorHref('zh', id),
      en: authorHref('en', id),
      xDefault: authorHref('zh', id),
    },
    image: { url: '/og/home.jpg', alt: author.name.zh },
    keywords: [author.name.zh, '郭瀞婷', 'Tina Kuo'],
  })
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { id } = await params
  if (!isAuthorId(id)) notFound()

  const author = getAuthor(id)
  const works = getWorksByAuthor(id)

  return (
    <>
      <JsonLd data={authorJsonLd(author, works, 'zh')} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: strings.home, path: '/' },
          { name: strings.navWorks, path: '/works' },
          { name: author.name.zh, path: authorHref('zh', id) },
        ])}
      />

      <div className="wrap detail-crumbs">
        <Breadcrumbs
          items={[
            { label: strings.home, href: homeHref('zh'), legacy: true },
            { label: strings.navWorks, href: '/works', legacy: false },
            { label: author.name.zh },
          ]}
        />
      </div>

      <header className="wrap author-hero page-head">
        <figure className="author-portrait">
          <img src={author.picture} alt={author.name.zh} decoding="async" />
        </figure>
        <div>
          <p className="eyebrow">{strings.aboutAuthor}</p>
          <h1 className="page-title">{author.name.zh}</h1>
          <p className="page-meta">{author.location.zh}</p>
          <p className="page-lead">{author.bio.zh}</p>
          <p className="author-links">
            {author.facebook ? (
              <a
                className="link-btn"
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            ) : null}
            <a className="link-btn" href={`${authorHref('zh', id)}feed.xml`}>
              RSS
            </a>
            <span className="work-count">{strings.workCount(works.length)}</span>
          </p>
        </div>
      </header>

      <div className="wrap page-body">
        <WorksGrid
          works={works}
          locale="zh"
          linkMode="legacy"
          emptyTitle={strings.emptyTitle}
          emptyBody={strings.emptyBody}
        />
      </div>

      <div className="wrap page-back">
        <a className="link-btn" href={worksHref('zh')}>
          ← {strings.allWorks}
        </a>
      </div>
    </>
  )
}
