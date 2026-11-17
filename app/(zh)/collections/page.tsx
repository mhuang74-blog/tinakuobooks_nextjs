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
  description: '依主題瀏覽郭瀞婷的作品：愛搞笑、青少、繪本、戲劇與故事延伸。',
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
          五個主題，五種閱讀的方式。挑一個喜歡的，讓故事繼續延伸。
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
