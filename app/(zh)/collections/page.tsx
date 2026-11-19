import type { Metadata } from 'next'
import { CollectionCard } from '@/components/collection-card'
import { collections } from '@/content/collections'
import { ui } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { getWorksByCollection } from '@/lib/works'

const strings = ui.zh

export const metadata: Metadata = buildMetadata({
  locale: 'zh',
  title: '主題',
  description: '依主題瀏覽郭瀞婷的作品與延伸活動，包括繪本、橋梁書、校園日記、推理與奇想和音樂劇。',
  path: '/collections',
  alternates: { zh: '/collections', en: '/en/collections', xDefault: '/collections' },
})

export default function CollectionsPage() {
  return (
    <>
      <div className="wrap page-head">
        <p className="eyebrow">{strings.collectionsKicker}</p>
        <h1 className="page-title">{strings.navCollections}</h1>
        <p className="page-lead">
          從想和孩子一起翻的繪本，到可以自己追線索的小說，挑一個主題開始。
        </p>
      </div>

      <div className="wrap page-body">
        <div className="collection-grid">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              locale="zh"
              count={getWorksByCollection(collection.id).length}
              href={`/tag/${collection.id}/`}
              linkMode="legacy"
            />
          ))}
        </div>
      </div>
    </>
  )
}
