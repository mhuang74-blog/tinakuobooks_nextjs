import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { WorksGrid } from '@/components/works-grid'
import { authors, getAuthor, isAuthorId } from '@/content/authors'
import { authorHref, ui } from '@/lib/i18n'
import { authorJsonLd, breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { FACEBOOK_URL } from '@/lib/site'
import { getTranslatedWorks } from '@/lib/works'

export const dynamicParams = false

const strings = ui.en

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
    locale: 'en',
    title: author.name.en,
    description: author.bio.en,
    path: authorHref('en', id),
    alternates: {
      zh: authorHref('zh', id),
      en: authorHref('en', id),
      xDefault: authorHref('zh', id),
    },
    image: { url: '/og/home.jpg', alt: author.name.en },
    keywords: [author.name.en, 'Tina Kuo'],
  })
}

export default async function EnAuthorPage({ params }: { params: Promise<Params> }) {
  const { id } = await params
  if (!isAuthorId(id)) notFound()

  const author = getAuthor(id)
  const works = getTranslatedWorks().filter((work) => work.authorId === id)

  return (
    <>
      <JsonLd data={authorJsonLd(author, works, 'en')} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: strings.home, path: '/en' },
          { name: strings.navWorks, path: '/en/works' },
          { name: author.name.en, path: authorHref('en', id) },
        ])}
      />

      <div className="wrap detail-crumbs">
        <Breadcrumbs
          items={[
            { label: strings.home, href: '/en' },
            { label: strings.navWorks, href: '/en/works' },
            { label: author.name.en },
          ]}
        />
      </div>

      <header className="wrap author-hero page-head">
        <figure className="author-portrait">
          <img src={author.picture} alt={author.name.en} decoding="async" />
        </figure>
        <div>
          <p className="eyebrow">{strings.aboutAuthor}</p>
          <h1 className="page-title">{author.name.en}</h1>
          <p className="page-meta">{author.location.en}</p>
          <p className="page-lead">{author.bio.en}</p>
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
            <a className="link-btn" href={`${authorHref('en', id)}/feed.xml`}>
              RSS
            </a>
            <span className="work-count">{strings.workCount(works.length)}</span>
          </p>
        </div>
      </header>

      <div className="wrap page-body">
        <WorksGrid
          works={works}
          locale="en"
          linkMode="next"
          emptyTitle={strings.emptyTitle}
          emptyBody={strings.emptyBody}
        />
      </div>

      <div className="wrap page-back">
        <Link className="link-btn" href="/en/collections">
          {strings.allCollections}
        </Link>
      </div>
    </>
  )
}
