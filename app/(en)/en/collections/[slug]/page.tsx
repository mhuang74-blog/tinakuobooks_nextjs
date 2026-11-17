import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { WorksGrid } from '@/components/works-grid'
import { collections, getCollection, isCollectionId } from '@/content/collections'
import { collectionHref, ui } from '@/lib/i18n'
import { breadcrumbJsonLd, buildMetadata, collectionJsonLd } from '@/lib/seo'
import { getTranslatedWorks } from '@/lib/works'

export const dynamicParams = false

const strings = ui.en

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return collections.map((collection) => ({ slug: collection.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  if (!isCollectionId(slug)) return {}
  const collection = getCollection(slug)

  return buildMetadata({
    locale: 'en',
    title: collection.name.en,
    description: `${collection.name.en} — ${collection.description.en}. Works by Tina Kuo.`,
    path: collectionHref('en', slug),
    alternates: {
      zh: collectionHref('zh', slug),
      en: collectionHref('en', slug),
      xDefault: collectionHref('zh', slug),
    },
    image: { url: '/og/home.jpg', alt: collection.name.en },
    keywords: [collection.name.en, 'Tina Kuo'],
  })
}

export default async function EnCollectionPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  if (!isCollectionId(slug)) notFound()

  const collection = getCollection(slug)
  const works = getTranslatedWorks().filter((work) => work.collectionId === slug)

  return (
    <>
      <JsonLd data={collectionJsonLd(collection, works, 'en')} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: strings.home, path: '/en' },
          { name: strings.navCollections, path: '/en/collections' },
          { name: collection.name.en, path: collectionHref('en', slug) },
        ])}
      />

      <div className="wrap detail-crumbs">
        <Breadcrumbs
          items={[
            { label: strings.home, href: '/en' },
            { label: strings.navCollections, href: '/en/collections' },
            { label: collection.name.en },
          ]}
        />
      </div>

      <header className="wrap page-head">
        <p className="eyebrow" style={{ color: collection.accent }}>
          {strings.collectionsKicker}
        </p>
        <h1 className="page-title">{collection.name.en}</h1>
        <p className="page-lead">{collection.description.en}</p>
        <p className="page-meta">{strings.workCount(works.length)}</p>
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
        <Link className="link-btn" href="/en/works">
          ← {strings.allWorks}
        </Link>
      </div>
    </>
  )
}
