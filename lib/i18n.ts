export type Locale = 'zh' | 'en'
export type Localized<T> = Record<Locale, T>

export const locales: Locale[] = ['zh', 'en']

export function isLocale(value: string): value is Locale {
  return value === 'zh' || value === 'en'
}

export function workHref(
  locale: Locale,
  work: { slug: string; slugEn: string },
): string {
  if (locale === 'en' && work.slugEn) return `/en/works/${work.slugEn}`
  return `/${work.slug}`
}

export function collectionHref(locale: Locale, id: string): string {
  return locale === 'en' ? `/en/collections/${id}` : `/tag/${id}/`
}

export function authorHref(locale: Locale, id: string): string {
  return locale === 'en' ? `/en/authors/${id}` : `/author/${id}/`
}

export function homeHref(locale: Locale): string {
  return locale === 'en' ? '/en' : '/'
}

export function worksHref(locale: Locale): string {
  return locale === 'en' ? '/en/works' : '/works'
}

export function collectionsHref(locale: Locale): string {
  return locale === 'en' ? '/en/collections' : '/collections'
}

export function aboutHref(locale: Locale): string {
  return locale === 'en' ? '/en/about' : '/about/'
}

export function feedHref(locale: Locale): string {
  return locale === 'en' ? '/en/feed.xml' : '/feed.xml'
}

/**
 * Dates are authored as `YYYY-MM-DD` and pinned to Taipei time so that the
 * server-rendered and client-rendered strings are identical.
 */
export function formatDate(date: string, locale: Locale): string {
  const parsed = new Date(`${date}T00:00:00+08:00`)
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-Hant-TW' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Taipei',
  }).format(parsed)
}

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g

export function estimateReadingMinutes(text: string): number {
  const cjkCharacters = (text.match(CJK) ?? []).length
  const latinWords = (
    text.replace(CJK, ' ').match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? []
  ).length
  return Math.max(1, Math.ceil(cjkCharacters / 300 + latinWords / 200))
}

const zhUi = {
  skipToContent: '跳到主要內容',
  navWorks: '作品',
  navCollections: '主題',
  navAbout: '關於',
  navReading: '陪孩子讀',
  navStory: '故事延伸',
  navContact: '聯絡',
  writeToAuthor: '寫信給作者',
  menu: '選單',
  openMenu: '開啟選單',
  closeMenu: '關閉選單',
  home: '首頁',
  subscribe: '訂閱',
  subscribeTitle: '訂閱新作品通知',
  subscribeDescription: '通過搞笑有趣的丁小飛故事學英文？！有興趣的爸爸媽媽請訂閱！',
  subscribeEmail: '電郵',
  subscribeName: '名字/綽號',
  subscribeSubmit: '我要訂閱',
  close: '關閉',
  languageToggleToEnglish: '切換到英文版',
  languageToggleUnavailable: '英文版準備中',
  languageName: 'EN',
  readingTime: (minutes: number) => `約 ${minutes} 分鐘閱讀`,
  readingTimeLabel: '閱讀時間',
  workCount: (count: number) => `${count} 件作品`,
  published: '發表於',
  author: '作者',
  collection: '主題',
  detailReader: '讀者',
  englishEdition: '英文版',
  inPreparation: '準備中',
  contents: '作品內容',
  readContents: '閱讀內容',
  relatedWorks: '相關作品',
  newerWork: '較新作品',
  olderWork: '較早作品',
  allWorks: '所有作品',
  allCollections: '所有主題',
  translationPending: '英文版準備中',
  share: '分享',
  shareFacebook: '分享到 Facebook',
  shareX: '分享到 X',
  copyLink: '複製連結',
  copied: '已複製連結',
  copyFailed: '無法複製，請手動選取網址',
  newsletterTitle: '訂閱電子報',
  newsletterBody: '新作品與活動消息，直接寄到你的信箱。',
  searchLabel: '搜尋作品',
  searchPlaceholder: '搜尋作品…',
  filterAll: '全部',
  sortLabel: '排序',
  sortNewest: '最新',
  sortOldest: '最舊',
  sortTitle: '依標題',
  resultCount: (count: number) => `${count} 件作品`,
  emptyTitle: '找不到作品',
  emptyBody: '換個關鍵字或主題試試看。',
  clearFilters: '清除篩選',
  notFoundTitle: '找不到頁面',
  notFoundBody: '這個頁面不存在，也許故事已經搬到別的地方了。',
  backHome: '回到首頁',
  browseWorks: '瀏覽作品',
  footerRights: '版權所有',
  footerLicense: '內容以 CC-BY-4.0 授權釋出，轉載請註明出處。',
  footerFacebook: 'Facebook',
  footerRss: 'RSS 訂閱',
  footerSource: '原始碼',
  footerBuiltWith: '以 Next.js 打造',
  readWork: '閱讀作品',
  exploreWorks: '探索作品',
  aboutAuthor: '關於作者',
  viewAllWorks: '查看全部作品',
  viewAllCollections: '查看全部主題',
  latestWorks: '最新作品',
  collectionsKicker: '主題',
  worksKicker: '作品',
  aboutKicker: '關於',
  moreAbout: '更多關於我們',
}

type Ui = typeof zhUi

const enUi: Ui = {
  skipToContent: 'Skip to content',
  navWorks: 'Works',
  navCollections: 'Collections',
  navAbout: 'About',
  navReading: 'Reading Together',
  navStory: 'Beyond the Books',
  navContact: 'Contact',
  writeToAuthor: 'Write to the author',
  menu: 'Menu',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  home: 'Home',
  subscribe: 'Subscribe',
  subscribeTitle: 'Get new work updates',
  subscribeDescription:
    'Learn English through the funny Ding Xiaofei stories?! Parents who are interested, subscribe here!',
  subscribeEmail: 'Email',
  subscribeName: 'Name / nickname',
  subscribeSubmit: 'Subscribe',
  close: 'Close',
  languageToggleToEnglish: 'Switch to English',
  languageToggleUnavailable: 'English translation coming soon',
  languageName: '中文',
  readingTime: (minutes: number) => (minutes === 1 ? '1 min read' : `${minutes} min read`),
  readingTimeLabel: 'Reading time',
  workCount: (count: number) => (count === 1 ? '1 work' : `${count} works`),
  published: 'Published',
  author: 'Author',
  collection: 'Collection',
  detailReader: 'Readers',
  englishEdition: 'English edition',
  inPreparation: 'In preparation',
  contents: 'Contents',
  readContents: 'Read the contents',
  relatedWorks: 'Related works',
  newerWork: 'Newer work',
  olderWork: 'Older work',
  allWorks: 'All works',
  allCollections: 'All collections',
  translationPending: 'English translation coming soon',
  share: 'Share',
  shareFacebook: 'Share on Facebook',
  shareX: 'Share on X',
  copyLink: 'Copy link',
  copied: 'Link copied',
  copyFailed: 'Could not copy; select the URL manually',
  newsletterTitle: 'Subscribe to the newsletter',
  newsletterBody: 'New works and events, straight to your inbox.',
  searchLabel: 'Search works',
  searchPlaceholder: 'Search works…',
  filterAll: 'All',
  sortLabel: 'Sort',
  sortNewest: 'Newest',
  sortOldest: 'Oldest',
  sortTitle: 'Title',
  resultCount: (count: number) => (count === 1 ? '1 work' : `${count} works`),
  emptyTitle: 'No works found',
  emptyBody: 'Try a different keyword or collection.',
  clearFilters: 'Clear filters',
  notFoundTitle: 'Page not found',
  notFoundBody: 'This page does not exist. The story may have moved elsewhere.',
  backHome: 'Back to home',
  browseWorks: 'Browse works',
  footerRights: 'All rights reserved',
  footerLicense: 'Content licensed under CC-BY-4.0 with attribution.',
  footerFacebook: 'Facebook',
  footerRss: 'RSS feed',
  footerSource: 'Source',
  footerBuiltWith: 'Built with Next.js',
  readWork: 'Read the work',
  exploreWorks: 'Explore works',
  aboutAuthor: 'About the author',
  viewAllWorks: 'View all works',
  viewAllCollections: 'View all collections',
  latestWorks: 'Latest works',
  collectionsKicker: 'Collections',
  worksKicker: 'Works',
  aboutKicker: 'About',
  moreAbout: 'More about us',
}

export const ui: Record<Locale, Ui> = { zh: zhUi, en: enUi }

export function getUi(locale: Locale): Ui {
  return ui[locale]
}

export type UiStrings = Ui
