import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { WorksGrid } from '@/components/works-grid'
import { collections, getCollection, isCollectionId } from '@/content/collections'
import { collectionHref, homeHref, ui, worksHref } from '@/lib/i18n'
import { breadcrumbJsonLd, buildMetadata, collectionJsonLd } from '@/lib/seo'
import { getWorksByCollection } from '@/lib/works'

export const dynamicParams = false

const strings = ui.zh

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
    locale: 'zh',
    title: collection.name.zh,
    description: `${collection.name.zh}｜${collection.description.zh}｜郭瀞婷作品`,
    path: collectionHref('zh', slug),
    alternates: {
      zh: collectionHref('zh', slug),
      en: collectionHref('en', slug),
      xDefault: collectionHref('zh', slug),
    },
    image: { url: '/og/home.jpg', alt: collection.name.zh },
    keywords: [collection.name.zh, '郭瀞婷', 'Tina Kuo'],
  })
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  if (!isCollectionId(slug)) notFound()

  const collection = getCollection(slug)
  const works = getWorksByCollection(slug)

  return (
    <>
      <JsonLd data={collectionJsonLd(collection, works, 'zh')} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: strings.home, path: '/' },
          { name: strings.navCollections, path: '/collections' },
          { name: collection.name.zh, path: collectionHref('zh', slug) },
        ])}
      />

      <div className="wrap detail-crumbs">
        <Breadcrumbs
          items={[
            { label: strings.home, href: homeHref('zh'), legacy: true },
            { label: strings.navCollections, href: '/collections', legacy: false },
            { label: collection.name.zh },
          ]}
        />
      </div>

      <header className="wrap page-head">
        <p className="eyebrow" style={{ color: collection.accent }}>
          {strings.collectionsKicker}
        </p>
        <h1 className="page-title">{collection.name.zh}</h1>
        <p className="page-lead">{collection.description.zh}</p>
        <p className="page-meta">{strings.workCount(works.length)}</p>
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
