import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { FeaturedWork } from '@/components/portfolio/featured-work'
import { HomeDialogProvider } from '@/components/portfolio/home-dialog-provider'
import { HomeShelf } from '@/components/portfolio/home-shelf'
import { InquiryForm } from '@/components/portfolio/inquiry-form'
import { coloringBook, homeCopy } from '@/content/portfolio'
import { getFeaturedEntry, getShelfEntries } from '@/lib/portfolio'
import { buildMetadata, websiteJsonLd } from '@/lib/seo'

const copy = homeCopy.zh
const locale = 'zh'

export const metadata: Metadata = {
  ...buildMetadata({
    locale,
    title: copy.meta.title,
    description: copy.meta.description,
    path: '/',
    alternates: { zh: '/', en: '/en', xDefault: '/' },
    image: { url: '/og/home.jpg', alt: copy.meta.title },
    keywords: ['郭瀞婷', 'Tina Kuo', '童書', '繪本', '兒童文學'],
  }),
  title: { absolute: copy.meta.title },
}

export default function HomePage() {
  const entries = getShelfEntries(locale)
  const featured = getFeaturedEntry(locale)
  const stats = [
    String(entries.length),
    String(new Set(entries.map((entry) => entry.category)).size),
    String(Math.min(...entries.map((entry) => Number(entry.year)))),
  ]

  return (
    <HomeDialogProvider locale={locale}>
      <JsonLd data={websiteJsonLd(locale)} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">{copy.hero.kicker[locale]}</p>
            <h1 className="hero-name">
              {copy.hero.name[locale]}
              <svg className="hero-seal" viewBox="0 0 34 34" aria-hidden="true" focusable="false">
                <rect
                  x="1"
                  y="1"
                  width="32"
                  height="32"
                  rx="3"
                  fill="none"
                  stroke="#BE4129"
                  strokeWidth="2"
                />
                <text
                  x="17"
                  y="23"
                  textAnchor="middle"
                  fontSize="16"
                  fill="#BE4129"
                  fontFamily="'Songti SC','Source Han Serif SC',serif"
                >
                  婷
                </text>
              </svg>
            </h1>
            <p className="hero-en">{copy.hero.subtitle[locale]}</p>
            <p className="hero-lead">{copy.hero.lead[locale]}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#works">
                {copy.hero.primaryCta[locale]}
              </a>
              <a className="btn btn-ghost" href="#contact">
                {copy.hero.secondaryCta[locale]}
              </a>
            </div>
            <div className="stats">
              {copy.hero.stats.map((stat, index) => (
                <div className="stat" key={stat.caption[locale]}>
                  <span className="stat-num">{stats[index]}</span>
                  <span className="stat-cap">{stat.caption[locale]}</span>
                </div>
              ))}
            </div>
          </div>

          <FeaturedWork entry={featured} locale={locale} />
        </div>
      </section>

      <section className="section" id="works">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">{copy.works.eyebrow[locale]}</p>
            <h2 className="section-title">{copy.works.title[locale]}</h2>
            <p className="section-lead">{copy.works.lead[locale]}</p>
          </header>

          <HomeShelf entries={entries} locale={locale} />
        </div>
      </section>

      <section className="section section-tint" id="reading">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">{copy.reading.eyebrow[locale]}</p>
            <h2 className="section-title">{copy.reading.title[locale]}</h2>
            <p className="section-lead">{copy.reading.lead[locale]}</p>
          </header>

          <div className="reading-grid">
            {copy.reading.cards.map((card) => (
              <article className="read-card" data-reveal key={card.title.zh}>
                <p className="read-age">{card.age[locale]}</p>
                <h3>{card.title[locale]}</h3>
                <p>{card.body[locale]}</p>
                <ul className="prompts">
                  {card.prompts.map((prompt) => (
                    <li key={prompt.zh}>{prompt[locale]}</li>
                  ))}
                </ul>
                <p className="read-books">{card.books[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap about-grid">
          <div className="about-copy">
            <p className="eyebrow">{copy.about.eyebrow[locale]}</p>
            <blockquote className="pull">{copy.about.quote[locale]}</blockquote>
            <p className="quote-src">{copy.about.source[locale]}</p>

            <div className="bio-row" data-reveal>
              <figure className="author-photo">
                <img
                  src="/images/bio-photo-tina.webp"
                  width={194}
                  height={200}
                  alt={copy.about.name[locale]}
                />
                <figcaption>{copy.about.caption[locale]}</figcaption>
              </figure>
              <div className="bio-text">
                <h3 className="bio-name">{copy.about.name[locale]}</h3>
                {copy.about.paragraphs.map((paragraph) => (
                  <p className="about-para" key={paragraph.zh}>
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="about-side">
            <h3 className="side-title">{copy.about.timelineTitle[locale]}</h3>
            <ul className="timeline">
              {copy.about.timeline.map((row) => (
                <li key={row.year}>
                  <span className="year">{row.year}</span>
                  <span>{row.text[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="story">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">{copy.story.eyebrow[locale]}</p>
            <h2 className="section-title">{copy.story.title[locale]}</h2>
            <p className="section-lead">{copy.story.lead[locale]}</p>
          </header>

          <div className="extension-grid">
            <article className="ext-card" data-reveal>
              <figure className="ext-poster">
                <img
                  className="ext-poster-img"
                  src="/images/portfolio/work-sofa-poster.webp"
                  width={763}
                  height={1080}
                  alt={copy.story.stage.title[locale]}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="ext-poster-credit">
                  {copy.story.stage.credit[locale]}
                </figcaption>
              </figure>
              <div className="ext-body">
                <p className="ext-kind">{copy.story.stage.kind[locale]}</p>
                <h3>{copy.story.stage.title[locale]}</h3>
                <p>{copy.story.stage.body[locale]}</p>
              </div>
            </article>

            <article className="ext-card" data-reveal>
              <img
                className="ext-img"
                src={coloringBook.art.src}
                width={coloringBook.art.width}
                height={coloringBook.art.height}
                alt={copy.story.coloring.title[locale]}
                loading="lazy"
                decoding="async"
              />
              <div className="ext-body">
                <p className="ext-kind">{copy.story.coloring.kind[locale]}</p>
                <h3>{copy.story.coloring.title[locale]}</h3>
                <p>{copy.story.coloring.body[locale]}</p>
                <a className="btn btn-on-dark ext-btn" href={coloringBook.pdf}>
                  {copy.story.coloring.cta[locale]}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-tint" id="contact">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">{copy.contact.eyebrow[locale]}</p>
            <h2 className="section-title" tabIndex={-1}>
              {copy.contact.title[locale]}
            </h2>
            <p className="section-lead">{copy.contact.lead[locale]}</p>
          </header>

          <div className="rights-grid">
            <div className="rights-left">
              <h3 className="sub-title">{copy.contact.reachTitle[locale]}</h3>
              <ul className="contact-list">
                {copy.contact.rows.map((row) => (
                  <li key={row.label.zh}>
                    <span className="contact-label">{row.label[locale]}</span>
                    {row.href ? (
                      <a href={row.href} rel="noopener">
                        {row.value[locale]}
                      </a>
                    ) : (
                      <span>{row.value[locale]}</span>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="sub-title sub-title-spaced">{copy.contact.licenceTitle[locale]}</h3>
              <p className="license-note">{copy.contact.licence[locale]}</p>

              <h3 className="sub-title sub-title-spaced">{copy.contact.usageTitle[locale]}</h3>
              <ul className="info-list">
                {copy.contact.usage.map((item) => (
                  <li key={item.label.zh}>
                    <span className="info-year">{item.label[locale]}</span>
                    {item.text[locale]}
                  </li>
                ))}
              </ul>
            </div>

            <InquiryForm locale={locale} />
          </div>
        </div>
      </section>
    </HomeDialogProvider>
  )
}
