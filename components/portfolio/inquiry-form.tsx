'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from 'react'
import { homeCopy } from '@/content/portfolio'
import type { Locale } from '@/lib/i18n'

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

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function InquiryForm({ locale }: Props) {
  const strings = homeCopy[locale].contact.form
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [summary, setSummary] = useState<FieldKey[]>([])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<{ who: string; topic: string } | null>(null)
  const [resetCount, setResetCount] = useState(0)

  const formRef = useRef<HTMLFormElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const topicRef = useRef<HTMLSelectElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const successTitleRef = useRef<HTMLHeadingElement>(null)

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
    name: (value) => value.trim().length > 0,
    topic: (value) => value !== '',
    email: (value) => EMAIL.test(value.trim()),
    message: (value) => value.trim().length >= 10,
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

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const invalid = FIELD_ORDER.filter((key) => !validate(key))
    if (invalid.length > 0) {
      setSummary(invalid)
      refs[invalid[0]].current?.focus()
      return
    }

    setSummary([])
    setSending(true)
    formRef.current?.setAttribute('aria-busy', 'true')

    window.setTimeout(() => {
      const topicValue = readField('topic')
      const topicLabel =
        strings.topics.find((topic) => topic.value === topicValue)?.label[locale] ??
        (locale === 'zh' ? '來信' : 'your note')
      const who = readField('name').trim() || (locale === 'zh' ? '你' : 'You')

      formRef.current?.removeAttribute('aria-busy')
      setSending(false)
      setSent({ who, topic: topicLabel })
    }, 900)
  }

  function handleAgain() {
    formRef.current?.reset()
    setErrors({})
    setSummary([])
    setSent(null)
    setResetCount((count) => count + 1)
  }

  const colon = locale === 'zh' ? '：' : ': '

  const textField = (key: 'name' | 'org' | 'email') => {
    const id = key === 'org' ? 'f-org' : FIELD_IDS[key as FieldKey]
    const ref = key === 'name' ? nameRef : key === 'org' ? undefined : emailRef
    const placeholder =
      key === 'name'
        ? strings.namePlaceholder[locale]
        : key === 'org'
          ? strings.orgPlaceholder[locale]
          : strings.emailPlaceholder[locale]
    const label = key === 'name' ? strings.name[locale] : key === 'org' ? strings.org[locale] : strings.email[locale]
    const error = key === 'org' ? undefined : errors[key as FieldKey]
    const required = key !== 'org'

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

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              id="form-submit"
              disabled={sending}
            >
              {sending ? strings.sending[locale] : strings.submit[locale]}
            </button>
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
