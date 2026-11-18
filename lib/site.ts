export const SITE_URL = 'https://www.tinakuobooks.com'
export const SITE_TITLE_ZH = '郭瀞婷 Tina Kuo'
export const SITE_TITLE_EN = 'Tina Kuo'
export const SITE_DESCRIPTION_ZH =
  '讓故事延伸下去 Celebrate stories created by my wife Tina Kuo.'
export const SITE_DESCRIPTION_EN = 'Celebrate stories created by Tina Kuo.'
export const SITE_KEYWORDS = [
  '郭瀞婷',
  '郭靜婷',
  'Tina Kuo',
  '丁小飛',
  '57號小豹',
  '童書',
  '繪本',
  '兒童文學',
  "children's books",
]
export const GA_ID = 'G-T01JGM3EKW'
export const ADSENSE_CLIENT = 'ca-pub-6071616698328487'
export const MAILCHIMP_ACTION =
  'https://tinakuobooks.us7.list-manage.com/subscribe/post?u=c520f89e29e0da47e72861621&id=e3e22bc014'
export const MAILCHIMP_HONEYPOT = 'b_c520f89e29e0da47e72861621_e3e22bc014'
export const FACEBOOK_URL = 'https://facebook.com/tinachingting'
export const SOURCE_URL = 'https://github.com/mhuang74-blog/tinakuobooks_nextjs'
export const MICHAEL_HUANG_URL = 'https://michaelhuang.xyz'

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}

/**
 * Percent-encode a public asset path. React emits eager `<img>` elements as a
 * `Link: <…>; rel=preload; as="image"` response header, and Node rejects
 * header values containing non-ASCII bytes (`ERR_INVALID_CHAR`), so cover
 * filenames authored in Chinese must be encoded before they reach `src`.
 */
export function assetUrl(src: string): string {
  return encodeURI(src)
}
