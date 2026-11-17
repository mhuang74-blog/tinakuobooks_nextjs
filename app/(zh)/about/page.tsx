import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { aboutParagraphs } from '@/content/about'
import { authors } from '@/content/authors'
import { homeHref, ui, worksHref } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { FACEBOOK_URL } from '@/lib/site'

const strings = ui.zh

export const metadata: Metadata = buildMetadata({
  locale: 'zh',
  title: '關於',
  description:
    '這是一個由 Michael S. Huang 建立的網站，收集郭瀞婷的作品，也用他的方式把故事延伸出去。',
  path: '/about/',
  alternates: { zh: '/about/', en: '/en/about', xDefault: '/about/' },
})

export default function AboutPage() {
  return (
    <>
      <div className="wrap detail-crumbs">
        <Breadcrumbs
          items={[{ label: strings.home, href: homeHref('zh'), legacy: true }, { label: strings.navAbout }]}
        />
      </div>

      <header className="wrap page-head">
        <p className="eyebrow">{strings.aboutKicker}</p>
        <h1 className="page-title">{strings.navAbout}</h1>
        <p className="page-lead">{aboutParagraphs.zh[0]}</p>
        <p className="page-meta" lang="en">
          {aboutParagraphs.en[0]}
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
                <img src={author.picture} alt={author.name.zh} loading="lazy" decoding="async" />
                <div>
                  <h3>{author.name.zh}</h3>
                  <p className="author-location">{author.location.zh}</p>
                  <p className="author-bio">{author.bio.zh}</p>
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
          <a className="btn btn-primary" href={worksHref('zh')}>
            {strings.exploreWorks}
          </a>
          <a className="btn btn-ghost" href="/collections">
            {strings.viewAllCollections}
          </a>
        </div>
      </div>
    </>
  )
}
