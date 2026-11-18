import type { Locale } from '@/lib/i18n'
import type { InlinePart } from '@/lib/inline'
import { MICHAEL_HUANG_URL } from '@/lib/site'

export const aboutParagraphs: Record<Locale, InlinePart[][]> = {
  zh: [[{ text: '在這裡收集了我心愛老婆郭瀞婷的作品，也用我的方式把她的故事延伸出去。' }]],
  en: [
    [
      { text: 'This is a portfolio and fan site created by me, ' },
      { href: MICHAEL_HUANG_URL, label: 'Michael S. Huang' },
      {
        text: ', to celebrate and build upon all the wonderfully inspirational and wacky works created by my lovely wife Tina Kuo.',
      },
    ],
  ],
}
