'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { CloseIcon } from '@/components/icons'
import { homeCopy } from '@/content/portfolio'
import { formatWorkLanguages, ui, type Locale } from '@/lib/i18n'
import type { ShelfEntry } from '@/lib/portfolio'
import { assetUrl } from '@/lib/site'

type Props = {
  entry: ShelfEntry | null
  locale: Locale
  trigger: HTMLElement | null
  onClosed: () => void
}

const iconStyle = { '--od-icon-size': '18px' } as CSSProperties

export function WorkDialog({ entry, locale, trigger, onClosed }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const jumpToContact = useRef(false)
  const copy = homeCopy[locale].works

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (entry && !dialog.open) {
      jumpToContact.current = false
      dialog.showModal()
      closeRef.current?.focus()
      const inner = dialog.querySelector('.dialog-inner')
      if (inner) inner.scrollTop = 0
    }

    if (!entry && dialog.open) dialog.close()
  }, [entry])

  const handleClose = () => {
    if (jumpToContact.current) {
      jumpToContact.current = false
      const heading = document.querySelector<HTMLElement>('#contact .section-title')
      if (heading) {
        heading.tabIndex = -1
        heading.focus({ preventScroll: true })
      }
    } else if (trigger && document.contains(trigger) && !trigger.closest('[hidden]')) {
      trigger.focus()
    } else {
      document.querySelector<HTMLElement>('.chip-btn')?.focus()
    }

    onClosed()
  }

  const facts = entry
    ? [
        [copy.dialog.category[locale], entry.categoryName],
        [copy.dialog.published[locale], entry.year],
        [copy.dialog.reader[locale], entry.reader],
        [copy.dialog.language[locale], formatWorkLanguages(entry.languages, locale)],
      ]
    : []

  return (
    <dialog
      ref={dialogRef}
      id="book-dialog"
      className="book-dialog"
      aria-labelledby="dialog-title"
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close()
      }}
    >
      <div className="dialog-inner">
        <button
          ref={closeRef}
          type="button"
          className="dialog-close"
          aria-label={ui[locale].close}
          onClick={() => dialogRef.current?.close()}
        >
          <CloseIcon className="od-icon" style={iconStyle} />
        </button>

        {entry ? (
          <div className="dialog-grid">
            <div className="dialog-cover">
              <span className="cover-frame">
                <img
                  className="cover-img"
                  src={assetUrl(entry.art.src)}
                  width={entry.art.width}
                  height={entry.art.height}
                  alt={entry.bookTitle}
                  decoding="async"
                />
              </span>
            </div>

            <div className="dialog-text">
              <p className="dialog-eyebrow">
                <span className="od-nowrap">{entry.categoryName}</span> · {entry.year}
              </p>
              <h2 className="dialog-title" id="dialog-title">
                {entry.bookTitle}
              </h2>
              <p className="dialog-blurb">{entry.description}</p>
              {entry.preview ? (
                <div className="dialog-preview">
                  {entry.preview.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              ) : null}

              <dl className="fact-list">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="detail-actions">
                <a className="link-btn" href={entry.href}>{copy.cardCta[locale]}</a>
              </p>

              <p className="dialog-note">
                {copy.dialog.note[locale]}{' '}
                <a
                  href="#contact"
                  data-close-dialog
                  onClick={() => {
                    jumpToContact.current = true
                    dialogRef.current?.close()
                  }}
                >
                  {copy.dialog.noteLink[locale]}
                </a>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </dialog>
  )
}
