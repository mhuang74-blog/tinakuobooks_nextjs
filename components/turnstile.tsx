'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { TURNSTILE_SCRIPT } from '@/lib/inquiry'
import type { Locale } from '@/lib/i18n'

const API_POLL_MS = 100
const API_POLL_LIMIT_MS = 15_000

type TurnstileOptions = {
  sitekey: string
  theme?: 'auto' | 'light' | 'dark'
  size?: 'normal' | 'flexible' | 'compact'
  language?: string
  callback?: (token: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
}

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

type Props = {
  siteKey: string
  locale: Locale
}

// next/script preloads Turnstile but does not execute it in this Next version,
// so the widget loads the API itself. The token travels in a controlled hidden
// input named "turnstileToken" inside the form: the form keeps reading its own
// fields from the DOM, and React cannot reset the value behind its back.
export function Turnstile({ siteKey, locale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<string | null>(null)
  const [token, setToken] = useState('')

  const renderWidget = useCallback(() => {
    const api = window.turnstile
    const container = containerRef.current
    if (!api || !container || widgetRef.current) return

    widgetRef.current = api.render(container, {
      sitekey: siteKey,
      theme: 'auto',
      size: 'flexible',
      language: locale === 'zh' ? 'zh-tw' : 'en',
      callback: setToken,
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
    })
  }, [locale, siteKey])

  useEffect(() => {
    if (window.turnstile) {
      renderWidget()
      return
    }

    if (!document.querySelector('script[data-turnstile]')) {
      const script = document.createElement('script')
      script.src = TURNSTILE_SCRIPT
      script.async = true
      script.defer = true
      script.dataset.turnstile = ''
      document.head.appendChild(script)
    }

    const deadline = Date.now() + API_POLL_LIMIT_MS
    const timer = window.setInterval(() => {
      if (window.turnstile) {
        window.clearInterval(timer)
        renderWidget()
        return
      }
      if (Date.now() > deadline) window.clearInterval(timer)
    }, API_POLL_MS)

    return () => window.clearInterval(timer)
  }, [renderWidget])

  useEffect(() => {
    return () => {
      const api = window.turnstile
      if (api && widgetRef.current) {
        api.remove(widgetRef.current)
        widgetRef.current = null
      }
    }
  }, [])

  return (
    <>
      <input type="hidden" name="turnstileToken" value={token} readOnly />
      <div ref={containerRef} className="turnstile-slot" />
    </>
  )
}
