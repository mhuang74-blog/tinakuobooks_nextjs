import type { Locale } from '@/lib/i18n'

export type PrivacySection = { heading: string; body: string[] }

export const privacyCopy: Record<
  Locale,
  { title: string; lead: string; sections: PrivacySection[] }
> = {
  zh: {
    title: '隱私權',
    lead: '這頁說明訂閱電子報時我們收集哪些資料、為什麼收集，以及你可以怎麼要求刪除。',
    sections: [
      {
        heading: '我們收集的資料',
        body: [
          '訂閱時我們收集你的電郵地址、名字或綽號，以及你使用的語言（中文或英文）。',
          '為了防止濫用，你的 IP 位址會在寄送與確認請求時短暫處理，不會寫入資料庫。',
          '正式環境另外載入 Google Analytics 與 Google AdSense，用來統計流量與顯示廣告；這些服務由 Google 依其隱私權政策處理資料。',
        ],
      },
      {
        heading: '用途',
        body: [
          '我們只用這些資料寄送新作品與活動消息，以及確認你的訂閱。',
          '我們不會出售你的資料，也不會用它做廣告投放或建立個人側寫。',
        ],
      },
      {
        heading: '處理者',
        body: [
          '電子報由 Resend 寄送，聯絡人資料也存放在 Resend，Resend 是我們的資料處理者。',
          '網站的表單驗證使用 Cloudflare Turnstile，用來分辨真人與自動化程式。',
        ],
      },
      {
        heading: '保存與取消訂閱',
        body: [
          '聯絡人資料會保存到你取消訂閱或要求刪除為止。',
          '每封電子報都附有取消訂閱連結；你也可以直接來信要求移除。',
        ],
      },
      {
        heading: '你的權利',
        body: [
          '你可以隨時來信 tina@tinakuobooks.com，要求查閱、更正或刪除我們持有的你的資料。',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy',
    lead: 'This page explains what the newsletter form collects, why, and how to have it removed.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you subscribe we collect your email address, your name or nickname, and the language you used (Chinese or English).',
          'To prevent abuse, your IP address is processed briefly for the send and confirmation requests. It is not written to a database.',
          'In production the site also loads Google Analytics and Google AdSense for traffic statistics and ads; Google handles that data under its own privacy policy.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'We use this data only to send news about new works and events, and to confirm your subscription.',
          'We do not sell your data, and we do not use it for ad targeting or profiling.',
        ],
      },
      {
        heading: 'Processors',
        body: [
          'The newsletter is delivered by Resend, which also stores the contact data as our processor.',
          'Form verification uses Cloudflare Turnstile to tell people from automated scripts.',
        ],
      },
      {
        heading: 'Retention and opt-out',
        body: [
          'Contact data is kept until you unsubscribe or ask us to delete it.',
          'Every newsletter includes an unsubscribe link, and you can also email us to be removed.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Email tina@tinakuobooks.com at any time to access, correct, or delete the data we hold about you.',
        ],
      },
    ],
  },
}
