import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowIcon } from '@/components/icons'
import { ui, type Locale } from '@/lib/i18n'
import { assetUrl } from '@/lib/site'
import type { WorkCardData } from '@/lib/work-card'

type Props = {
  work: WorkCardData
  locale: Locale
  linkMode: 'legacy' | 'next'
}

type CardLinkProps = {
  href: string
  className: string
  ariaLabel: string
  legacy: boolean
  children: ReactNode
}

function CardLink({ href, className, ariaLabel, legacy, children }: CardLinkProps) {
  return legacy ? (
    <a href={href} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}

export function WorkCard({ work, locale, linkMode }: Props) {
  const strings = ui[locale]
  const legacy = linkMode === 'legacy'
  const readAria = `${strings.readWork} ${work.title}`

  return (
    <article className="book-card">
      <CardLink href={work.href} className="cover-link" ariaLabel={readAria} legacy={legacy}>
        <span className="cover-frame">
          <img
            className="cover-img"
            src={assetUrl(work.art.src)}
            width={work.art.width}
            height={work.art.height}
            alt={work.bookTitle}
            loading="lazy"
            decoding="async"
          />
        </span>
      </CardLink>

      <div className="book-meta">
        <p className="book-tags">
          <span className="tag-chip od-nowrap">{work.collectionName}</span>
          <span className="book-genre">{work.year}</span>
        </p>
        <h3 className="book-title">{work.bookTitle}</h3>
        <p className="book-line">{work.tagline}</p>
        <CardLink href={work.href} className="link-btn" ariaLabel={readAria} legacy={legacy}>
          {strings.readWork}
          <ArrowIcon className="od-icon" style={{ '--od-icon-size': '14px' } as CSSProperties} />
        </CardLink>
      </div>
    </article>
  )
}
