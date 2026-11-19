import { formatDate, type Locale } from '@/lib/i18n'
import type { Work } from '@/lib/works'

const kinds: Record<string, string> = {
  繪本: 'Picture book',
  橋梁書: 'Early chapter book',
  小說: 'Novel',
  選集: 'Anthology',
  音樂劇: 'Musical',
  著色本: 'Colouring book',
}

const readerAges: Record<string, string> = {
  學前至低年級: 'Preschool to early elementary',
  小學低中年級: 'Early to middle elementary',
  小學中年級: 'Middle elementary',
  小學中年級以上: 'Middle elementary and up',
  小學高年級以上: 'Upper elementary and up',
  '約 10–12 歲': 'Around ages 10–12',
  '10 歲以上': 'Ages 10 and up',
  國中以上: 'Middle school and up',
  親子共賞: 'Family audiences',
}

export function getWorkReadership(work: Work, locale: Locale): string {
  const { kind, readers } = work.publication
  return [
    kind && (locale === 'en' ? kinds[kind] ?? kind : kind),
    readers && (locale === 'en' ? readerAges[readers] ?? readers : readers),
  ].filter(Boolean).join(' · ')
}

export function getWorkPublicationRows(work: Work, locale: Locale): [string, string][] {
  const { kind, yearOnly, illustrator, coAuthors, playwrights } = work.publication
  const zh = locale === 'zh'
  const dateLabel = kind === '音樂劇'
    ? (zh ? '首演' : 'Premiere')
    : kind === '著色本'
      ? (zh ? '上線' : 'Posted')
      : (zh ? '首次出版' : 'First published')
  const rows: [string, string][] = [
    [dateLabel, yearOnly ? work.date.slice(0, 4) : formatDate(work.date, locale)],
  ]
  if (illustrator) {
    const name = !zh && kind === '著色本' ? 'Michael’s younger sister' : illustrator
    rows.push([zh ? '繪者' : 'Illustrator', name])
  }
  const joiner = zh ? '、' : ', '
  if (coAuthors?.length) rows.push([zh ? '其他作者' : 'Other authors', coAuthors.join(joiner)])
  if (playwrights?.length) rows.push([zh ? '編劇' : 'Playwrights', playwrights.join(joiner)])
  return rows
}
