export type AuthorId = 'tina' | 'michael'

export type Author = {
  id: AuthorId
  name: { zh: string; en: string }
  bio: { zh: string; en: string }
  location: { zh: string; en: string }
  picture: string
  facebook?: string
}

export const authors: Author[] = [
  {
    id: 'tina',
    name: { zh: '郭瀞婷 Tina Kuo', en: 'Tina Kuo' },
    bio: {
      zh: '整天跟可愛又好動小女兒鬥志，偶爾會發呆，但一有空就衝回電腦敲出幾頁要留給孩子以後讀的故事。',
      en: "Spends her days keeping up with a cute and endlessly energetic little daughter. She stares into space now and then, but the moment she has a free minute she rushes back to the keyboard to type out a few more pages of stories for her children to read in years to come.",
    },
    location: { zh: '台北，台灣', en: 'Taipei, Taiwan' },
    picture: '/images/bio-photo-tina.webp',
    facebook: 'tinachingting',
  },
  {
    id: 'michael',
    name: { zh: '孩子爸 Michael', en: 'Michael S. Huang' },
    bio: {
      zh: '喜歡幻想，更喜歡動手做東西',
      en: 'Loves to imagine, and loves even more to make things with his own hands.',
    },
    location: { zh: '台北，台灣', en: 'Taipei, Taiwan' },
    picture: '/images/bio-photo-michael-2.webp',
  },
]

const byId = new Map(authors.map((author) => [author.id, author]))

export function getAuthor(id: AuthorId): Author {
  const author = byId.get(id)
  if (!author) throw new Error(`Unknown author: ${id}`)
  return author
}

export function isAuthorId(value: string): value is AuthorId {
  return byId.has(value as AuthorId)
}
