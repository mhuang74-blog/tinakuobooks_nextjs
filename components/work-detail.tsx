import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { NewsletterSection } from '@/components/newsletter-section'
import { ReadingProgress } from '@/components/reading-progress'
import { ShareButtons } from '@/components/share-buttons'
import { WorkCard } from '@/components/work-card'
import { getAuthor } from '@/content/authors'
import { getCollection } from '@/content/collections'
import {
  authorHref,
  collectionHref,
  homeHref,
  ui,
  workHref,
  worksHref,
  type Locale,
} from '@/lib/i18n'
import { Markdown } from '@/lib/markdown'
import { toShelfEntry } from '@/lib/portfolio'
import { absoluteUrl } from '@/lib/site'
import type { Work } from '@/lib/works'
import { toWorkCardData } from '@/lib/work-card'
import { workJsonLd, workPath } from '@/lib/seo'

type Props = {
  work: Work
  locale: Locale
  newer?: Work
  older?: Work
  related: Work[]
}

export function WorkDetail({ work, locale, newer, older, related }: Props) {
  const strings = ui[locale]
  const collection = getCollection(work.collectionId)
  const author = getAuthor(work.authorId)
  const shelf = toShelfEntry(work.slug, locale)
  const linkMode = locale === 'zh' ? 'legacy' : 'next'
  const title = work.title[locale]
  const bodyLang =
    locale === 'en' && work.translationPending ? 'zh-Hant' : locale === 'en' ? 'en' : 'zh-Hant'

  const collectionCard =
    linkMode === 'legacy' ? (
      <a
        href={collectionHref(locale, collection.id)}
        className="eyebrow"
        style={{ color: collection.accent }}
      >
        {collection.name[locale]}
      </a>
    ) : (
      <Link
        href={collectionHref(locale, collection.id)}
        className="eyebrow"
        style={{ color: collection.accent }}
      >
        {collection.name[locale]}
      </Link>
    )

  const authorCard =
    linkMode === 'legacy' ? (
      <a href={authorHref(locale, author.id)}>{author.name[locale]}</a>
    ) : (
      <Link href={authorHref(locale, author.id)}>{author.name[locale]}</Link>
    )

  const notice =
    locale === 'zh' && !work.slugEn
      ? '英文版準備中 English translation coming soon'
      : locale === 'en' && work.translationPending
        ? 'English translation pending. The original Chinese text is shown below.'
        : null

  const alt = toWorkCardData(work, locale).bookTitle
  const facts: [string, string][] = [
    [strings.collection, collection.name[locale]],
    [strings.detailReader, shelf?.reader ?? work.description[locale]],
    [strings.published, work.date.slice(0, 4)],
    [strings.englishEdition, work.slugEn ? strings.englishEdition : strings.inPreparation],
  ]

  return (
    <article>
      <ReadingProgress />
      <JsonLd data={workJsonLd(work, locale)} />

      <div className="wrap detail-crumbs">
        <Breadcrumbs
          items={[
            { label: strings.home, href: homeHref(locale), legacy: linkMode === 'legacy' },
            { label: strings.navWorks, href: worksHref(locale), legacy: linkMode === 'legacy' },
            { label: title },
          ]}
        />
      </div>

      <div className="wrap detail-head">
        <figure className="detail-cover">
          <span className="cover-frame">
            <img
              className="cover-img"
              src={shelf?.art.src ?? work.cover}
              width={shelf?.art.width}
              height={shelf?.art.height}
              alt={alt}
              decoding="async"
            />
          </span>
        </figure>

        <div>
          {collectionCard}
          <h1 className="detail-title">{title}</h1>
          {work.title.en && work.title.en !== title ? (
            <p className="detail-en">{work.title.en}</p>
          ) : null}
          <p className="detail-blurb">{work.description[locale]}</p>

          <dl className="fact-list">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div>
              <dt>{strings.author}</dt>
              <dd>{authorCard}</dd>
            </div>
          </dl>

          <div className="detail-share">
            <ShareButtons
              url={absoluteUrl(workPath(work, locale))}
              title={title}
              locale={locale}
            />
          </div>

          <p className="detail-actions">
            <a className="btn btn-primary" href="#contents">
              {strings.readContents}
            </a>
          </p>
        </div>
      </div>

      {notice ? (
        <div className="wrap">
          <p className="notice">{notice}</p>
        </div>
      ) : null}

      <section className="wrap detail-body-section" id="contents" aria-label={title}>
        <p className="eyebrow">{strings.contents}</p>
        <Markdown className="work-body" lang={bodyLang}>
          {work.body[locale]}
        </Markdown>
      </section>

      <div className="wrap detail-foot">
        {related.length > 0 ? (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading">{strings.relatedWorks}</h2>
            <div className="shelf detail-related">
              {related.map((item) => (
                <WorkCard
                  key={item.slug}
                  work={toWorkCardData(item, locale)}
                  locale={locale}
                  linkMode={linkMode}
                />
              ))}
            </div>
          </section>
        ) : null}

        <nav aria-label={strings.navWorks} className="pager">
          {newer ? (
            linkMode === 'next' ? (
              <Link href={workHref(locale, newer)}>
                <span className="eyebrow">← {strings.newerWork}</span>
                <span className="pager-title">{newer.title[locale]}</span>
              </Link>
            ) : (
              <a href={workHref(locale, newer)}>
                <span className="eyebrow">← {strings.newerWork}</span>
                <span className="pager-title">{newer.title[locale]}</span>
              </a>
            )
          ) : (
            <span aria-hidden="true" />
          )}
          {older ? (
            linkMode === 'next' ? (
              <Link href={workHref(locale, older)} className="pager-next">
                <span className="eyebrow">{strings.olderWork} →</span>
                <span className="pager-title">{older.title[locale]}</span>
              </Link>
            ) : (
              <a href={workHref(locale, older)} className="pager-next">
                <span className="eyebrow">{strings.olderWork} →</span>
                <span className="pager-title">{older.title[locale]}</span>
              </a>
            )
          ) : null}
        </nav>

        <NewsletterSection locale={locale} idPrefix="work-newsletter" />
      </div>
    </article>
  )
}
