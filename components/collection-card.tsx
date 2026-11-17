import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ui, type Locale } from '@/lib/i18n'
import { getCollection, type CollectionId } from '@/content/collections'

type Props = {
  id: CollectionId
  locale: Locale
  count: number
  href: string
  linkMode: 'legacy' | 'next'
}

export function CollectionCard({ id, locale, count, href, linkMode }: Props) {
  const collection = getCollection(id)
  const strings = ui[locale]
  const style = { '--accent': collection.accent } as CSSProperties

  const body = (
    <>
      <span className="collection-thumb">
        <img src={collection.cover} alt="" loading="lazy" decoding="async" />
      </span>
      <div className="collection-body">
        <h3>{collection.name[locale]}</h3>
        <span className="collection-desc">{collection.description[locale]}</span>
        <span className="work-count">{strings.workCount(count)}</span>
      </div>
    </>
  )

  return linkMode === 'next' ? (
    <Link href={href} className="collection-tile" style={style}>
      {body}
    </Link>
  ) : (
    <a href={href} className="collection-tile" style={style}>
      {body}
    </a>
  )
}
