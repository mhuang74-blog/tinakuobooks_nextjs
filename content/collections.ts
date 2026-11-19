export type CollectionId =
  | 'funny-fiction'
  | 'young-adult-fiction'
  | 'picture-book'
  | 'bridge-books'
  | 'stage-performance'
  | 'story-continues'

export type Collection = {
  id: CollectionId
  name: { zh: string; en: string }
  description: { zh: string; en: string }
  cover: string
  accent: string
}

// Cover photos: Pexels free license (no attribution required), recorded for maintainability.
// Sources live in assets/source-images/stock/collection-*.jpg; `pnpm images` regenerates the WebP.
//   funny-fiction        18830120  Muziyan Du — two siblings laughing on an orange sofa
//   young-adult-fiction  27300378  xiao zheng geng — high-school girl reading by a classroom window
//   picture-book         18830152  Muziyan Du — girl playfully holding a picture book in class
//   stage-performance    13726442  klub boks — children in Chinese-opera costume and makeup
//   story-continues      18830100  Muziyan Du — two girls sharing a book in window light
export const collections: Collection[] = [
  {
    id: 'funny-fiction',
    name: { zh: '愛搞笑', en: 'Funny Fiction' },
    description: { zh: '就是愛搞笑', en: 'Just for laughs' },
    cover: '/images/collection-funny-fiction.webp',
    accent: 'var(--collection-funny)',
  },
  {
    id: 'young-adult-fiction',
    name: { zh: '推理與奇想', en: 'Mystery & Fantasy' },
    description: { zh: '追線索，也走進不一樣的世界', en: 'Follow a clue or step into another world' },
    cover: '/images/collection-young-adult-fiction.webp',
    accent: 'var(--collection-ya)',
  },
  {
    id: 'picture-book',
    name: { zh: '繪本', en: 'Picture Book' },
    description: { zh: '看圖說故事', en: 'Stories told in pictures' },
    cover: '/images/collection-picture-book.webp',
    accent: 'var(--collection-picture)',
  },
  {
    id: 'bridge-books',
    name: { zh: '橋梁書', en: 'Early Chapter Books' },
    description: { zh: '從共讀走向自己讀下一章', en: 'From reading together to reading the next chapter on their own' },
    cover: '/images/collection-story-continues.webp',
    accent: 'var(--collection-bridge)',
  },
  {
    id: 'stage-performance',
    name: { zh: '戲劇', en: 'Stage Performance' },
    description: { zh: '讓故事活起來', en: 'Stories come alive' },
    cover: '/images/collection-stage-performance.webp',
    accent: 'var(--collection-stage)',
  },
  {
    id: 'story-continues',
    name: { zh: '故事延伸', en: 'Story Continues' },
    description: { zh: '故事延伸', en: 'Beyond the story' },
    cover: '/images/collection-story-continues.webp',
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
