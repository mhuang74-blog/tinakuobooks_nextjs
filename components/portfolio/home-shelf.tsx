'use client'

import { useRef, useState, type CSSProperties } from 'react'
import { ArrowIcon } from '@/components/icons'
import { useWorkDialog } from '@/components/portfolio/home-dialog-provider'
import { categoryChips, homeCopy, type PortfolioCategory } from '@/content/portfolio'
import type { Locale } from '@/lib/i18n'
import type { ShelfEntry } from '@/lib/portfolio'
import { assetUrl } from '@/lib/site'

type Props = {
  entries: ShelfEntry[]
  locale: Locale
}

const arrowStyle = { '--od-icon-size': '14px' } as CSSProperties

export function HomeShelf({ entries, locale }: Props) {
  const { openWork } = useWorkDialog()
  const copy = homeCopy[locale].works
  const [active, setActive] = useState<'all' | PortfolioCategory>('all')
  const allChipRef = useRef<HTMLButtonElement>(null)

  const visible = active === 'all' ? entries : entries.filter((entry) => entry.category === active)

  function reset() {
    setActive('all')
    allChipRef.current?.focus()
  }

  return (
    <>
      <div className="filters">
        <div
          className="chip-rail"
          role="group"
          aria-label={locale === 'zh' ? '依分類篩選作品' : 'Filter works by category'}
        >
          {categoryChips.map((chip) => (
            <button
              key={chip.id}
              ref={chip.id === 'all' ? allChipRef : undefined}
              className="chip-btn"
              type="button"
              aria-pressed={active === chip.id}
              onClick={() => setActive(chip.id)}
            >
              {chip.label[locale]}
            </button>
          ))}
        </div>
        <div className="filter-genre">
          <button
            className="link-btn"
            type="button"
            id="filter-reset"
            disabled={active === 'all'}
            onClick={reset}
          >
            {copy.reset[locale]}
          </button>
        </div>
      </div>

      <p className="result-count" id="result-count" role="status" aria-live="polite">
        {active === 'all'
          ? copy.countAll(entries.length)
          : copy.countFiltered(visible.length, entries.length)}
      </p>

      {visible.length === 0 ? (
        <div className="shelf-empty" id="shelf-empty">
          <p className="empty-title">{copy.emptyTitle[locale]}</p>
          <p className="empty-body">{copy.emptyBody[locale]}</p>
          <button className="btn btn-ghost" type="button" id="empty-reset" onClick={reset}>
            {copy.emptyCta[locale]}
          </button>
        </div>
      ) : (
        <div className="shelf" id="shelf">
          {visible.map((entry) => (
            <article className="book-card" data-collection={entry.category} key={entry.slug}>
              <button
                className="cover-btn"
                type="button"
                data-open
                aria-label={copy.openAria(entry.title)}
                onClick={(event) => openWork(entry, event.currentTarget)}
              >
                <span className="cover-frame">
                  <img
                    className="cover-img"
                    src={assetUrl(entry.art.src)}
                    width={entry.art.width}
                    height={entry.art.height}
                    alt={entry.bookTitle}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </button>
              <div className="book-meta">
                <p className="book-tags">
                  <span className="tag-chip od-nowrap">{entry.categoryName}</span>
                  <span className="book-genre">{entry.year}</span>
                </p>
                <h3 className="book-title">{entry.bookTitle}</h3>
                <p className="book-line">{entry.description}</p>
                <button
                  className="link-btn"
                  type="button"
                  onClick={(event) => openWork(entry, event.currentTarget)}
                >
                  {copy.cardCta[locale]}
                  <ArrowIcon className="od-icon" style={arrowStyle} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
