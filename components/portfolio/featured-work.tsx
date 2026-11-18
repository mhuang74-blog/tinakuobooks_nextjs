'use client'

import { useRef } from 'react'
import { useWorkDialog } from '@/components/portfolio/home-dialog-provider'
import { homeCopy } from '@/content/portfolio'
import type { Locale } from '@/lib/i18n'
import type { ShelfEntry } from '@/lib/portfolio'
import { assetUrl } from '@/lib/site'

type Props = {
  entry: ShelfEntry
  locale: Locale
}

export function FeaturedWork({ entry, locale }: Props) {
  const { openWork } = useWorkDialog()
  const copy = homeCopy[locale].feature
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <aside className="feature" aria-labelledby="feature-title" data-reveal>
      <p className="feature-label">{copy.label[locale]}</p>
      <div className="feature-cover">
        <span className="cover-frame">
          <img
            className="cover-img"
            src={assetUrl(entry.art.src)}
            width={entry.art.width}
            height={entry.art.height}
            alt={entry.bookTitle}
            loading="eager"
            decoding="async"
          />
        </span>
      </div>
      <h2 className="feature-title" id="feature-title">
        {entry.bookTitle}
      </h2>
      <p className="feature-line">{copy.line[locale]}</p>
      <button
        ref={buttonRef}
        className="btn btn-primary feature-btn"
        type="button"
        onClick={() => {
          if (buttonRef.current) openWork(entry, buttonRef.current)
        }}
      >
        {copy.cta[locale]}
      </button>
    </aside>
  )
}
