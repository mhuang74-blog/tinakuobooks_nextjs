import { MAILCHIMP_ACTION, MAILCHIMP_HONEYPOT } from '@/lib/site'
import { ui, type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  idPrefix?: string
}

export function NewsletterForm({ locale, idPrefix = 'subscribe' }: Props) {
  const strings = ui[locale]
  const emailId = `${idPrefix}-email`
  const nameId = `${idPrefix}-name`

  return (
    <form
      action={MAILCHIMP_ACTION}
      method="post"
      target="_blank"
      rel="noopener noreferrer"
      className="newsletter-form"
    >
      <div className="field">
        <label htmlFor={emailId}>{strings.subscribeEmail}</label>
        <input
          id={emailId}
          type="email"
          name="EMAIL"
          required
          autoComplete="email"
          className="input"
        />
      </div>

      <div className="field">
        <label htmlFor={nameId}>{strings.subscribeName}</label>
        <input
          id={nameId}
          type="text"
          name="CH_NAME"
          required
          autoComplete="nickname"
          className="input"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[5000px] h-0 w-0 overflow-hidden"
      >
        <input
          type="text"
          name={MAILCHIMP_HONEYPOT}
          tabIndex={-1}
          defaultValue=""
          autoComplete="off"
        />
      </div>

      <button type="submit" name="subscribe" className="btn btn-primary">
        {strings.subscribeSubmit}
      </button>
    </form>
  )
}
