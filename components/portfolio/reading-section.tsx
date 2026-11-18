import { InlineText } from '@/components/inline-text'
import { homeCopy } from '@/content/portfolio'
import type { Locale } from '@/lib/i18n'

export function ReadingSection({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale].reading

  return (
    <section className="section section-tint" id="reading">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">{copy.eyebrow[locale]}</p>
          <h2 className="section-title">{copy.title[locale]}</h2>
          <p className="section-lead">{copy.lead[locale]}</p>
        </header>

        <div className="reading-grid">
          {copy.cards.map((card) => (
            <article className="read-card" data-reveal key={card.title.zh}>
              <p className="read-age">{card.age[locale]}</p>
              <h3>{card.title[locale]}</h3>
              <p>
                <InlineText parts={card.body[locale]} locale={locale} />
              </p>
              <ul className="prompts">
                {card.prompts.map((prompt) => (
                  <li key={prompt.zh}>{prompt[locale]}</li>
                ))}
              </ul>
              <p className="read-books">
                <InlineText parts={card.books[locale]} locale={locale} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
