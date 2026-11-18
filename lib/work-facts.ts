import type { Locale, Localized } from '@/lib/i18n'

export type PublishPrecision = 'day' | 'month' | 'year'
export type WorkStatus = '在版' | '絕版'
export type WorkEdition = { label: string; date: string; note: string }
export type WorkCredits = {
  role: string            // 文 | 文·圖 | 合著 | 故事構成 | 繪
  illustrator: string
  coAuthors: string[]
  playwrights: string[]
  adaptationSource: string
}
export type TitleStatus = 'verified-existing' | 'official' | 'proposed'
export type WorkFacts = {
  kind: string            // 繪本 | 橋梁書 | 小說 | 選集 | 音樂劇 | 著色本
  ageBand: string         // exact catalogue label
  titleStatus: TitleStatus // English title provenance; the EN file records it
  publisher: string
  publishedPrecision: PublishPrecision
  isbn: string
  format: string          // 精裝 | 平裝 | ''
  pages: number | null
  printing: string        // 全彩印刷 | 雙色印刷 | 單色印刷 | ''
  series: string
  seriesPosition: number | null
  seriesTotal: number | null
  status: WorkStatus
  statusNote: Localized<string>
  awards: string[]
  editions: WorkEdition[]
  credits: WorkCredits
  contentNote: Localized<string>
  discussion: Localized<string[]>
}

export const workTerms = {
  kind: { 繪本: 'Picture book', 橋梁書: 'Early chapter book', 小說: 'Novel',
          選集: 'Anthology', 音樂劇: 'Musical', 著色本: 'Coloring book' },
  ageBand: { 學前至低年級: 'Preschool–grade 2',
             '學前至低年級（親子共讀）': 'Preschool–grade 2, read together',
             '小學低中年級（橋梁書）': 'Grades 1–4',
             小學中年級: 'Grades 3–4',
             小學中年級以上: 'Grade 3 and up',
             '小學中年級以上（10–12 歲）': 'Grades 3–4 (ages 10–12)',
             小學高年級以上: 'Grade 5 and up',
             '10 歲以上': 'Ages 10+',
             國中以上: 'Ages 12+',
             親子共賞: 'Family audiences' },
  format: { 精裝: 'Hardcover', 平裝: 'Paperback' },
  printing: { 全彩印刷: 'Full colour', 雙色印刷: 'Two-colour', 單色印刷: 'One-colour' },
  role: { 文: 'Text', '文·圖': 'Text and illustrations', 合著: 'Co-author',
          故事構成: 'Story structure', 繪: 'Illustrations' },
  status: { 在版: 'In print', 絕版: 'Out of print' },
} as const

export type WorkTermGroup = keyof typeof workTerms

export function term(group: WorkTermGroup, value: string, locale: Locale): string {
  const table = workTerms[group] as Record<string, string>
  return (locale === 'en' ? table[value] : value) ?? value
}
