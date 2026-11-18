import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { InlineText } from '@/components/inline-text'
import { aboutParagraphs } from '@/content/about'
import { authors } from '@/content/authors'
import { ui } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { FACEBOOK_URL } from '@/lib/site'

const strings = ui.en

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  title: 'About',
  description:
    'A portfolio and fan site created by Michael S. Huang to celebrate the works of Tina Kuo.',
  path: '/en/about',
  alternates: { zh: '/about/', en: '/en/about', xDefault: '/about/' },
})

export default function EnAboutPage() {
  return (
    <>
      <div className="wrap detail-crumbs">
        <Breadcrumbs items={[{ label: strings.home, href: '/en' }, { label: strings.navAbout }]} />
      </div>

      <header className="wrap page-head">
        <p className="eyebrow">{strings.aboutKicker}</p>
        <h1 className="page-title">{strings.navAbout}</h1>
        <p className="page-lead">
          <InlineText parts={aboutParagraphs.en[0]} locale="en" />
        </p>
        <p className="page-meta" lang="zh-Hant">
          <InlineText parts={aboutParagraphs.zh[0]} locale="en" />
        </p>
      </header>

      <div className="wrap page-body">
        <section aria-labelledby="authors-heading">
          <h2 id="authors-heading" className="section-title">
            {strings.author}
          </h2>
          <div className="author-cards" style={{ marginTop: 20 }}>
            {authors.map((author) => (
              <article className="author-card" key={author.id}>
                <img src={author.picture} alt={author.name.en} loading="lazy" decoding="async" />
                <div>
                  <h3>{author.name.en}</h3>
                  <p className="author-location">{author.location.en}</p>
                  <p className="author-bio">{author.bio.en}</p>
                  {author.facebook ? (
                    <p className="author-links">
                      <a
                        className="link-btn"
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Facebook
                      </a>
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="page-cta">
          <Link className="btn btn-primary" href="/en/works">
            {strings.exploreWorks}
          </Link>
          <Link className="btn btn-ghost" href="/en/collections">
            {strings.viewAllCollections}
          </Link>
        </div>
      </div>
    </>
  )
}
