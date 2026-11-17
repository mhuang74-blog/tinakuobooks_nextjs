'use client'

import { useEffect, useRef, useState } from 'react'
import { FacebookIcon, LinkIcon, XIcon } from '@/components/icons'
import { ui, type Locale } from '@/lib/i18n'

type Props = {
  url: string
  title: string
  locale: Locale
}

export function ShareButtons({ url, title, locale }: Props) {
  const strings = ui[locale]
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const x = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), 2000)
  }

  const buttonClass = 'share-btn'

  return (
    <div className="share-row">
      <span className="eyebrow">{strings.share}</span>

      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={strings.shareFacebook}
        className={buttonClass}
      >
        <FacebookIcon className="od-icon" />
        Facebook
      </a>

      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={strings.shareX}
        className={buttonClass}
      >
        <XIcon className="od-icon" />X
      </a>

      <button
        type="button"
        onClick={copyLink}
        aria-label={strings.copyLink}
        className={buttonClass}
      >
        <LinkIcon className="od-icon" />
        {strings.copyLink}
      </button>

      <span role="status" aria-live="polite" className="page-meta">
        {status === 'copied' ? strings.copied : status === 'failed' ? strings.copyFailed : ''}
      </span>
    </div>
  )
}
