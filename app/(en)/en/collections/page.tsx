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
    'Browse picture books, early chapter books, funny fiction, mystery and fantasy, stage works, and activities.',
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
          Find a picture book to share or a mystery a young reader can get lost in on their own.
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
