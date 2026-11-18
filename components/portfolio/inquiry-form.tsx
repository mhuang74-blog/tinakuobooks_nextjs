'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from 'react'
import { homeCopy } from '@/content/portfolio'
import { INQUIRY_ENDPOINT, INQUIRY_LIMITS, type InquiryPayload } from '@/lib/inquiry'
import { Turnstile } from '@/components/turnstile'
import type { Locale } from '@/lib/i18n'
import { awaitTurnstileToken } from '@/lib/turnstile-client'
import { EMAIL_PATTERN } from '@/lib/validation'

type FieldKey = 'name' | 'topic' | 'email' | 'message'

type Props = {
  locale: Locale
}

const ICON_STYLE = { '--od-icon-size': '28px' } as CSSProperties

const FIELD_ORDER: FieldKey[] = ['name', 'topic', 'email', 'message']

const FIELD_IDS: Record<FieldKey, string> = {
  name: 'f-name',
  topic: 'f-topic',
  email: 'f-email',
  message: 'f-message',
}

export function InquiryForm({ locale }: Props) {
  const strings = homeCopy[locale].contact.form
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [summary, setSummary] = useState<FieldKey[]>([])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<{ who: string; topic: string } | null>(null)
  const [resetCount, setResetCount] = useState(0)
  const [sendError, setSendError] = useState<string | null>(null)
  const [captchaReset, setCaptchaReset] = useState(0)

  const formRef = useRef<HTMLFormElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const topicRef = useRef<HTMLSelectElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const orgRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null)
  const successTitleRef = useRef<HTMLHeadingElement>(null)

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

  const refs = {
    name: nameRef,
    topic: topicRef,
    email: emailRef,
    message: messageRef,
  }

  const labels: Record<FieldKey, string> = {
    name: strings.name[locale],
    topic: strings.topic[locale],
    email: strings.email[locale],
    message: strings.message[locale],
  }

  const errorsCopy: Record<FieldKey, string> = {
    name: strings.errors.name[locale],
    topic: strings.errors.topic[locale],
    email: strings.errors.email[locale],
    message: strings.errors.message[locale],
  }

  const tests: Record<FieldKey, (value: string) => boolean> = {
    name: (value) => {
      const trimmed = value.trim()
      return trimmed.length > 0 && trimmed.length <= INQUIRY_LIMITS.name
    },
    topic: (value) => value !== '',
    email: (value) => {
      const trimmed = value.trim()
      return (
        EMAIL_PATTERN.test(trimmed) && trimmed.length <= INQUIRY_LIMITS.email
      )
    },
    message: (value) => {
      const trimmed = value.trim()
      return trimmed.length >= 10 && trimmed.length <= INQUIRY_LIMITS.message
    },
  }

  function readField(key: FieldKey): string {
    return refs[key].current?.value ?? ''
  }

  function clearError(key: FieldKey) {
    setErrors((previous) => {
      if (!previous[key]) return previous
      const next = { ...previous }
      delete next[key]
      return next
    })
  }

  function validate(key: FieldKey): boolean {
    if (tests[key](readField(key))) {
      clearError(key)
      return true
    }
    setErrors((previous) => ({ ...previous, [key]: errorsCopy[key] }))
    return false
  }

  useEffect(() => {
    if (sent) successTitleRef.current?.focus()
  }, [sent])

  useEffect(() => {
    if (resetCount > 0) nameRef.current?.focus()
  }, [resetCount])

  function readToken(): string {
    const element = formRef.current?.elements.namedItem('turnstileToken')
    return element instanceof HTMLInputElement ? element.value : ''
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return

    const invalid = FIELD_ORDER.filter((key) => !validate(key))
    if (invalid.length > 0) {
      setSummary(invalid)
      refs[invalid[0]].current?.focus()
      return
    }

    setSummary([])
    setSendError(null)
    setSending(true)
    formRef.current?.setAttribute('aria-busy', 'true')

    const turnstileToken = readToken() || (turnstileSiteKey ? await awaitTurnstileToken(readToken) : '')
    if (turnstileSiteKey && !turnstileToken) {
      formRef.current?.removeAttribute('aria-busy')
      setSending(false)
      setSendError(strings.errors.captcha[locale])
      return
    }

    const payload: InquiryPayload = {
      name: readField('name').trim(),
      org: orgRef.current?.value.trim() ?? '',
      topic: readField('topic'),
      email: readField('email').trim(),
      message: readField('message').trim(),
      website: websiteRef.current?.value ?? '',
      turnstileToken,
      locale,
    }

    const fail = (message: string) => {
      setSendError(message)
      setCaptchaReset((count) => count + 1)
    }

    try {
      const response = await fetch(INQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await response.json().catch(() => null)) as { error?: string } | null
      if (!response.ok) {
        fail(
          result?.error === 'captcha_failed'
            ? strings.errors.captcha[locale]
            : strings.errors.send[locale],
        )
        return
      }

      const topicLabel =
        strings.topics.find((topic) => topic.value === payload.topic)?.label[locale] ??
        (locale === 'zh' ? '來信' : 'your note')
      const who = payload.name || (locale === 'zh' ? '你' : 'You')
      setSent({ who, topic: topicLabel })
    } catch {
      fail(strings.errors.send[locale])
    } finally {
      formRef.current?.removeAttribute('aria-busy')
      setSending(false)
    }
  }

  function handleAgain() {
    formRef.current?.reset()
    setErrors({})
    setSummary([])
    setSendError(null)
    setSent(null)
    setResetCount((count) => count + 1)
  }

  const colon = locale === 'zh' ? '：' : ': '

  const textField = (key: 'name' | 'org' | 'email') => {
    const id = key === 'org' ? 'f-org' : FIELD_IDS[key as FieldKey]
    const ref = key === 'name' ? nameRef : key === 'org' ? orgRef : emailRef
    const placeholder =
      key === 'name'
        ? strings.namePlaceholder[locale]
        : key === 'org'
          ? strings.orgPlaceholder[locale]
          : strings.emailPlaceholder[locale]
    const label = key === 'name' ? strings.name[locale] : key === 'org' ? strings.org[locale] : strings.email[locale]
    const error = key === 'org' ? undefined : errors[key as FieldKey]
    const required = key !== 'org'
    const maxLength =
      key === 'name'
        ? INQUIRY_LIMITS.name
        : key === 'org'
          ? INQUIRY_LIMITS.org
          : INQUIRY_LIMITS.email

    return (
      <div
        className="field"
        data-field={key}
        data-invalid={error ? 'true' : undefined}
      >
        <label htmlFor={id}>
          {label}
          {required ? (
            <span className="req" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        <input
          ref={ref}
          id={id}
          name={key}
          type={key === 'email' ? 'email' : 'text'}
          maxLength={maxLength}
          autoComplete={key === 'name' ? 'name' : key === 'org' ? 'organization' : 'email'}
          inputMode={key === 'email' ? 'email' : undefined}
          placeholder={placeholder}
          aria-describedby={key === 'org' ? undefined : `${id}-error`}
          aria-invalid={error ? 'true' : undefined}
          onBlur={key === 'org' ? undefined : () => validate(key as FieldKey)}
          onInput={
            key === 'org'
              ? undefined
              : () => {
                  const field = key as FieldKey
                  if (errors[field] && tests[field](readField(field))) clearError(field)
                }
          }
        />
        {key === 'org' ? null : (
          <p className="field-error" id={`${id}-error`} hidden={!error}>
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="form-card" id="write">
      <div className="form-head">
        <h3>{strings.title[locale]}</h3>
        <p className="form-help">{strings.help[locale]}</p>
      </div>

      <div
        className="form-summary"
        id="form-summary"
        role="alert"
        hidden={summary.length === 0}
      >
        <p className="summary-title">{strings.summaryTitle[locale]}</p>
        <ul className="summary-list" id="summary-list">
          {summary.map((key) => (
            <li key={key}>
              <a href={`#${FIELD_IDS[key]}`}>
                {labels[key]}
                {colon}
                {errorsCopy[key]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {sent ? null : (
        <form ref={formRef} id="inquiry-form" noValidate onSubmit={handleSubmit}>
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

          {textField('name')}
          {textField('org')}

          <div
            className="field"
            data-field="topic"
            data-invalid={errors.topic ? 'true' : undefined}
          >
            <label htmlFor="f-topic">
              {strings.topic[locale]}
              <span className="req" aria-hidden="true">
                *
              </span>
            </label>
            <select
              ref={topicRef}
              id="f-topic"
              name="topic"
              aria-describedby="f-topic-error"
              aria-invalid={errors.topic ? 'true' : undefined}
              onChange={() => validate('topic')}
            >
              <option value="">{strings.topicPlaceholder[locale]}</option>
              {strings.topics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label[locale]}
                </option>
              ))}
            </select>
            <p className="field-error" id="f-topic-error" hidden={!errors.topic}>
              {errors.topic}
            </p>
          </div>

          {textField('email')}

          <div
            className="field"
            data-field="message"
            data-invalid={errors.message ? 'true' : undefined}
          >
            <label htmlFor="f-message">
              {strings.message[locale]}
              <span className="req" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              ref={messageRef}
              id="f-message"
              name="message"
              rows={5}
              maxLength={INQUIRY_LIMITS.message}
              placeholder={strings.messagePlaceholder[locale]}
              aria-describedby="f-message-error"
              aria-invalid={errors.message ? 'true' : undefined}
              onBlur={() => validate('message')}
              onInput={() => {
                if (errors.message && tests.message(readField('message'))) clearError('message')
              }}
            />
            <p className="field-error" id="f-message-error" hidden={!errors.message}>
              {errors.message}
            </p>
          </div>

          {turnstileSiteKey ? (
            <div className="turnstile-field">
              <Turnstile key={captchaReset} siteKey={turnstileSiteKey} locale={locale} />
            </div>
          ) : null}

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              id="form-submit"
              disabled={sending}
            >
              {sending ? strings.sending[locale] : strings.submit[locale]}
            </button>
            {sendError ? (
              <p className="form-error" role="alert">
                {sendError}
              </p>
            ) : null}
            <p className="form-note">{strings.note[locale]}</p>
          </div>
        </form>
      )}

      <div className="form-success" id="form-success" hidden={!sent}>
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
        <h3 className="success-title" id="success-title" tabIndex={-1} ref={successTitleRef}>
          {strings.successTitle[locale]}
        </h3>
        <p className="success-body" id="success-body">
          {sent ? strings.successBody(sent.who, sent.topic) : ''}
        </p>
        <button className="btn btn-ghost" type="button" id="form-again" onClick={handleAgain}>
          {strings.again[locale]}
        </button>
      </div>
    </div>
  )
}
