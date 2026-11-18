import type { Locale } from '@/lib/i18n'

export const SUBSCRIBE_ENDPOINT = '/api/subscribe'
export const SUBSCRIBE_CONFIRM_PATH = '/api/subscribe/confirm'

export const SUBSCRIBE_LIMITS = {
  name: 100,
  email: 254,
  turnstileToken: 2048,
  bodyBytes: 10_000,
  perIpPerWindow: 5,
  perEmailPerWindow: 3,
  windowMs: 10 * 60 * 1000,
  tokenTtlMs: 48 * 60 * 60 * 1000,
} as const

export type SubscribePayload = {
  email: string
  name: string
  locale: Locale
  website: string
  turnstileToken: string
}

export type SubscribeResponse =
  | { ok: true }
  | { error: 'invalid_fields'; fields: string[] }
  | { error: 'captcha_failed' | 'rate_limited' | 'not_configured' | 'send_failed' }

export type ConfirmPayload = {
  email: string
  name: string
  locale: Locale
  iat: number
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function buildConfirmationEmail(
  name: string,
  locale: Locale,
  url: string,
): { subject: string; text: string; html: string } {
  if (locale === 'en') {
    const subject = 'Confirm your subscription to Tina Kuo’s updates'
    const text = [
      `Hi ${name},`,
      '',
      'Click the link below to confirm your subscription, and news about new works and events will arrive in this inbox.',
      '',
      url,
      '',
      "This link expires in 48 hours. If you didn't request this, ignore this email.",
      '',
      '— tinakuobooks.com',
    ].join('\n')
    const html = [
      `<p>Hi ${escapeHtml(name)},</p>`,
      '<p>Click the link below to confirm your subscription, and news about new works and events will arrive in this inbox.</p>',
      `<p><a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>`,
      "<p>This link expires in 48 hours. If you didn't request this, ignore this email.</p>",
      '<p>— tinakuobooks.com</p>',
    ].join('')
    return { subject, text, html }
  }

  const subject = '請確認訂閱郭瀞婷的新作品通知'
  const text = [
    `你好 ${name}：`,
    '',
    '請點擊下面的連結確認訂閱，之後新作品與活動消息會寄到這個信箱。',
    '',
    url,
    '',
    '這個連結 48 小時內有效。如果這不是你，請忽略這封信。',
    '',
    '— tinakuobooks.com',
  ].join('\n')
  const html = [
    `<p>你好 ${escapeHtml(name)}：</p>`,
    '<p>請點擊下面的連結確認訂閱，之後新作品與活動消息會寄到這個信箱。</p>',
    `<p><a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>`,
    '<p>這個連結 48 小時內有效。如果這不是你，請忽略這封信。</p>',
    '<p>— tinakuobooks.com</p>',
  ].join('')
  return { subject, text, html }
}
