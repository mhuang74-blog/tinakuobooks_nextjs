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
  description: 'Browse Tina Kuo’s books and stage work, plus activities inspired by the stories.',
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
          Find a picture book to read aloud, an early chapter book for a new independent reader,
          or a novel to share with a teen. The musical and colouring book are here too.
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
