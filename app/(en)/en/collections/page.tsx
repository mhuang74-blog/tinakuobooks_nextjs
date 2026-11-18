import type { Metadata } from 'next'
import { CollectionCard } from '@/components/collection-card'
import { collections } from '@/content/collections'
import { ui } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { getTranslatedWorks } from '@/lib/works'

const strings = ui.en

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  title: 'Collections',
  description:
    'Browse Tina Kuo works by collection: funny fiction, young adult fiction, picture books, early chapter books, stage performance, and story continuations.',
  path: '/en/collections',
  alternates: { zh: '/collections', en: '/en/collections', xDefault: '/collections' },
})

export default function EnCollectionsPage() {
  const works = getTranslatedWorks()

  return (
    <>
      <div className="wrap page-head">
        <p className="eyebrow">{strings.collectionsKicker}</p>
        <h1 className="page-title">{strings.navCollections}</h1>
        <p className="page-lead">
          Six collections, six ways to read. Pick one and let the story continue.
        </p>
      </div>

      <div className="wrap page-body">
        <div className="collection-grid">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              locale="en"
              count={works.filter((work) => work.collectionId === collection.id).length}
              href={`/en/collections/${collection.id}`}
              linkMode="next"
            />
          ))}
        </div>
      </div>
    </>
  )
}
