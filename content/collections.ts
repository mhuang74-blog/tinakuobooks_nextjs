export type CollectionId =
  | 'funny-fiction'
  | 'young-adult-fiction'
  | 'picture-book'
  | 'stage-performance'
  | 'story-continues'

export type Collection = {
  id: CollectionId
  name: { zh: string; en: string }
  description: { zh: string; en: string }
  cover: string
  accent: string
}

export const collections: Collection[] = [
  {
    id: 'funny-fiction',
    name: { zh: '愛搞笑', en: 'Funny Fiction' },
    description: { zh: '就是愛搞笑', en: 'Just for laughs' },
    cover: '/images/school-chulkboard.webp',
    accent: 'var(--collection-funny)',
  },
  {
    id: 'young-adult-fiction',
    name: { zh: '青少', en: 'Young Adult Fiction' },
    description: { zh: '給愛讀書的妳', en: 'For the young reader' },
    cover: '/images/speeches.webp',
    accent: 'var(--collection-ya)',
  },
  {
    id: 'picture-book',
    name: { zh: '繪本', en: 'Picture Book' },
    description: { zh: '看圖說故事', en: 'Stories told in pictures' },
    cover: '/images/fables.webp',
    accent: 'var(--collection-picture)',
  },
  {
    id: 'stage-performance',
    name: { zh: '戲劇', en: 'Stage Performance' },
    description: { zh: '讓故事活起來', en: 'Stories come alive' },
    cover: '/images/sky.webp',
    accent: 'var(--collection-stage)',
  },
  {
    id: 'story-continues',
    name: { zh: '故事延伸', en: 'Story Continues' },
    description: { zh: '故事延伸', en: 'Beyond the story' },
    cover: '/images/design.webp',
    accent: 'var(--collection-story)',
  },
]

const byId = new Map(collections.map((collection) => [collection.id, collection]))

export function getCollection(id: CollectionId): Collection {
  const collection = byId.get(id)
  if (!collection) throw new Error(`Unknown collection: ${id}`)
  return collection
}

export function isCollectionId(value: string): value is CollectionId {
  return byId.has(value as CollectionId)
}
