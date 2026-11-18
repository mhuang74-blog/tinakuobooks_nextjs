'use client'

import { useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from 'react'
import { Turnstile } from '@/components/turnstile'
import { trackEvent } from '@/lib/analytics'
import { privacyHref, ui, type Locale } from '@/lib/i18n'
import { SUBSCRIBE_ENDPOINT, SUBSCRIBE_LIMITS, type SubscribeResponse } from '@/lib/subscribe'
import { awaitTurnstileToken } from '@/lib/turnstile-client'
import { EMAIL_PATTERN } from '@/lib/validation'

type Props = {
  locale: Locale
  idPrefix?: string
  source?: 'dialog' | 'inline'
  showAgain?: boolean
}

const ICON_STYLE = { '--od-icon-size': '28px' } as CSSProperties

export function NewsletterForm({
  locale,
  idPrefix = 'subscribe',
  source = 'inline',
  showAgain = false,
}: Props) {
  const strings = ui[locale]
  const emailId = `${idPrefix}-email`
  const nameId = `${idPrefix}-name`

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [captchaReset, setCaptchaReset] = useState(0)
  const [resetCount, setResetCount] = useState(0)

  const formRef = useRef<HTMLFormElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null)
  const successTitleRef = useRef<HTMLHeadingElement>(null)

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

  useEffect(() => {
    if (sent) successTitleRef.current?.focus()
  }, [sent])

  useEffect(() => {
    if (resetCount > 0) emailRef.current?.focus()
  }, [resetCount])

  function readToken(): string {
    const element = formRef.current?.elements.namedItem('turnstileToken')
    return element instanceof HTMLInputElement ? element.value : ''
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return

    const trimmedEmail = email.trim()
    const trimmedName = name.trim()
    const nextErrors: { email?: string; name?: string } = {}
    if (trimmedEmail.length > SUBSCRIBE_LIMITS.email || !EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = strings.subscribeInvalidEmail
    }
    if (trimmedName.length < 1 || trimmedName.length > SUBSCRIBE_LIMITS.name) {
      nextErrors.name = strings.subscribeInvalidName
    }
    setErrors(nextErrors)
    if (nextErrors.email || nextErrors.name) {
      const firstInvalid = nextErrors.email ? emailRef : nameRef
      firstInvalid.current?.focus()
      return
    }

    setSendError(null)
    setSending(true)

    const fail = (message: string) => {
      setSendError(message)
      setCaptchaReset((count) => count + 1)
    }

    try {
      const turnstileToken =
        readToken() || (turnstileSiteKey ? await awaitTurnstileToken(readToken) : '')
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail.toLowerCase(),
          name: trimmedName,
          locale,
          website: websiteRef.current?.value ?? '',
          turnstileToken,
        }),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as SubscribeResponse | null
        const code = result && 'error' in result ? result.error : null
        fail(
          code === 'captcha_failed'
            ? strings.subscribeCaptchaError
            : code === 'rate_limited'
              ? strings.subscribeRateLimitedError
              : strings.subscribeError,
        )
        return
      }

      trackEvent('newsletter_signup', { locale, source })
      setSent(true)
    } catch {
      fail(strings.subscribeError)
    } finally {
      setSending(false)
    }
  }

  function handleAgain() {
    setEmail('')
    setName('')
    setErrors({})
    setSendError(null)
    setSent(false)
    setCaptchaReset((count) => count + 1)
    setResetCount((count) => count + 1)
    if (websiteRef.current) websiteRef.current.value = ''
  }

  if (sent) {
    return (
      <div className="form-success">
        <svg
          className="od-icon success-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          style={ICON_STYLE}
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7.5 12.4l3 3 6-6.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="success-title" tabIndex={-1} ref={successTitleRef}>
          {strings.subscribeSuccessTitle}
        </h3>
        <p className="success-body">{strings.subscribeSuccessBody}</p>
        {showAgain ? (
          <button className="btn btn-ghost" type="button" onClick={handleAgain}>
            {strings.subscribeAgain}
          </button>
        ) : null}
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={sending}
      className="newsletter-form"
    >
      <div className="field" data-invalid={errors.email ? 'true' : undefined}>
        <label htmlFor={emailId}>{strings.subscribeEmail}</label>
        <input
          ref={emailRef}
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={SUBSCRIBE_LIMITS.email}
          value={email}
          aria-describedby={`${emailId}-error`}
          aria-invalid={errors.email ? 'true' : undefined}
          onChange={(event) => {
            setEmail(event.target.value)
            if (errors.email) setErrors((previous) => ({ ...previous, email: undefined }))
          }}
        />
        <p className="field-error" id={`${emailId}-error`} hidden={!errors.email}>
          {errors.email}
        </p>
      </div>

      <div className="field" data-invalid={errors.name ? 'true' : undefined}>
        <label htmlFor={nameId}>{strings.subscribeName}</label>
        <input
          ref={nameRef}
          id={nameId}
          name="name"
          type="text"
          autoComplete="nickname"
          maxLength={SUBSCRIBE_LIMITS.name}
          value={name}
          aria-describedby={`${nameId}-error`}
          aria-invalid={errors.name ? 'true' : undefined}
          onChange={(event) => {
            setName(event.target.value)
            if (errors.name) setErrors((previous) => ({ ...previous, name: undefined }))
          }}
        />
        <p className="field-error" id={`${nameId}-error`} hidden={!errors.name}>
          {errors.name}
        </p>
      </div>

      <div aria-hidden="true" className="absolute -left-[5000px] h-0 w-0 overflow-hidden">
        <input
          ref={websiteRef}
          type="text"
          name="website"
          tabIndex={-1}
          defaultValue=""
          autoComplete="off"
        />
      </div>

      {turnstileSiteKey ? (
        <div className="turnstile-field">
          <Turnstile key={captchaReset} siteKey={turnstileSiteKey} locale={locale} />
        </div>
      ) : null}

      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? strings.subscribeSending : strings.subscribeSubmit}
      </button>

      {sendError ? (
        <p className="form-error" role="alert">
          {sendError}
        </p>
      ) : null}

      <p className="form-note newsletter-consent">
        {strings.subscribeConsent}{' '}
        <a href={privacyHref(locale)}>{strings.subscribePrivacyLink}</a>
      </p>
    </form>
  )
}
