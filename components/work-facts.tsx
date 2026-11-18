import type { ReactNode } from 'react'
import { formatDate, ui, type Locale } from '@/lib/i18n'
import { term, type WorkFacts } from '@/lib/work-facts'

type Props = {
  facts: WorkFacts
  date: string
  locale: Locale
  author: ReactNode
  collection: string
  languages: string
}

export function WorkFactsPanel({ facts, date, locale, author, collection, languages }: Props) {
  const strings = ui[locale]
  const { credits, seriesPosition, seriesTotal } = facts
  const firstPublished = {
    day: () => formatDate(date, locale),
    month: () => date.slice(0, 7),
    year: () => date.slice(0, 4) + (locale === 'zh' ? ' 年' : ''),
  }[facts.publishedPrecision]()
  const binding = [
    term('format', facts.format, locale),
    facts.pages === null ? '' : `${facts.pages} ${locale === 'zh' ? '頁' : 'pp'}`,
    term('printing', facts.printing, locale),
  ].filter(Boolean).join(' · ')
  const seriesNumber = seriesPosition !== null && seriesTotal !== null
    ? ` ${seriesPosition} / ${seriesTotal}`
    : ''
  const statusNote = facts.statusNote[locale]
  const availability = term('status', facts.status, locale) + (
    statusNote ? (locale === 'zh' ? `（${statusNote}）` : ` (${statusNote})`) : ''
  )
  const editions = facts.editions.length > 0 ? (
    <ul>
      {facts.editions.map(({ label, date, note }) => (
        <li key={`${label}-${date}`}>{label} · {formatDate(date, locale)} · {note}</li>
      ))}
    </ul>
  ) : null

  const rows: [string, ReactNode][] = [
    [strings.collection, collection],
    [strings.typeKind, [term('kind', facts.kind, locale), term('ageBand', facts.ageBand, locale)].filter(Boolean).join(' · ')],
    [strings.publisher, facts.publisher],
    [strings.firstPublished, firstPublished],
    [strings.isbn, facts.isbn],
    [strings.binding, binding],
    [strings.series, facts.series ? facts.series + seriesNumber : ''],
    [strings.availability, availability],
    [strings.awards, facts.awards.join(locale === 'zh' ? '、' : '; ')],
    [strings.role, term('role', credits.role, locale)],
    [strings.illustrator, credits.illustrator],
    [strings.coAuthors, credits.coAuthors.join('、')],
    [strings.playwrights, credits.playwrights.join('、')],
    [strings.sourceWork, credits.adaptationSource],
    [strings.editions, editions],
    [strings.language, languages],
    [strings.author, author],
  ]

  return (
    <dl className="fact-list fact-list-wide">
      {rows.map(([label, value]) => value ? (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ) : null)}
    </dl>
  )
}
