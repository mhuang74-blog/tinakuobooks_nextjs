import { NewsletterForm } from '@/components/newsletter-form'
import { ui, type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  idPrefix: string
}

export function NewsletterSection({ locale, idPrefix }: Props) {
  const strings = ui[locale]

  return (
    <section className="newsletter-section" aria-labelledby={`${idPrefix}-heading`}>
      <div className="newsletter-grid">
        <div>
          <p className="eyebrow">{strings.subscribe}</p>
          <h2 id={`${idPrefix}-heading`}>{strings.newsletterTitle}</h2>
          <p className="newsletter-lead">{strings.newsletterBody}</p>
        </div>
        <div className="newsletter-card">
          <NewsletterForm locale={locale} idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  )
}
