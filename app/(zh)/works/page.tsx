import type { Metadata } from 'next'
import { Suspense } from 'react'
import { WorksExplorer } from '@/components/works-explorer'
import { WorksGridSkeleton } from '@/components/works-grid-skeleton'
import { collections } from '@/content/collections'
import { ui } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { toWorkCardData } from '@/lib/work-card'
import { getAllWorks } from '@/lib/works'

const strings = ui.zh

export const metadata: Metadata = buildMetadata({
  locale: 'zh',
  title: '所有作品',
  description: '郭瀞婷創作的童書、青少年小說與繪本作品一覽，可搜尋與篩選。',
  path: '/works',
  alternates: { zh: '/works', en: '/en/works', xDefault: '/works' },
})

export default function WorksPage() {
  const works = getAllWorks()

  return (
    <>
      <div className="wrap page-head">
        <p className="eyebrow">{strings.worksKicker}</p>
        <h1 className="page-title">{strings.allWorks}</h1>
        <p className="page-lead">
          從愛搞笑的校園日記到青少年小說、繪本與戲劇，這裡收錄了郭瀞婷的每一部作品。
        </p>
        <p className="page-meta">
          <a className="link-btn" href="/collections">
            依主題瀏覽
          </a>
        </p>
      </div>

      <div className="wrap page-body">
        <Suspense fallback={<WorksGridSkeleton />}>
          <WorksExplorer
            works={works.map((work) => toWorkCardData(work, 'zh'))}
            collections={collections.map((collection) => ({
              id: collection.id,
              name: collection.name.zh,
              count: works.filter((work) => work.collectionId === collection.id).length,
            }))}
            locale="zh"
            linkMode="legacy"
          />
        </Suspense>
      </div>
    </>
  )
}
