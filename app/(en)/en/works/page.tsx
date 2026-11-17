import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { WorksExplorer } from '@/components/works-explorer'
import { WorksGridSkeleton } from '@/components/works-grid-skeleton'
import { collections } from '@/content/collections'
import { ui } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { toWorkCardData } from '@/lib/work-card'
import { getTranslatedWorks } from '@/lib/works'

const strings = ui.en

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  title: 'All works',
  description: 'Search and filter every book, picture book, and stage story written by Tina Kuo.',
  path: '/en/works',
  alternates: { zh: '/works', en: '/en/works', xDefault: '/works' },
})

export default function EnWorksPage() {
  const works = getTranslatedWorks()

  return (
    <>
      <div className="wrap page-head">
        <p className="eyebrow">{strings.worksKicker}</p>
        <h1 className="page-title">{strings.allWorks}</h1>
        <p className="page-lead">
          From slapstick school diaries to young adult novels, picture books, and stage
          adaptations — every work by Tina Kuo in one place.
        </p>
        <p className="page-meta">
          <Link className="link-btn" href="/en/collections">
            Browse by collection
          </Link>
        </p>
      </div>

      <div className="wrap page-body">
        <Suspense fallback={<WorksGridSkeleton />}>
          <WorksExplorer
            works={works.map((work) => toWorkCardData(work, 'en'))}
            collections={collections.map((collection) => ({
              id: collection.id,
              name: collection.name.en,
              count: works.filter((work) => work.collectionId === collection.id).length,
            }))}
            locale="en"
            linkMode="next"
          />
        </Suspense>
      </div>
    </>
  )
}
