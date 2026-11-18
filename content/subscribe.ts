import type { Locale } from '@/lib/i18n'

export type ConfirmStatus = 'ok' | 'invalid' | 'expired' | 'unsubscribed' | 'error'

export const CONFIRM_STATUSES: readonly ConfirmStatus[] = [
  'ok',
  'invalid',
  'expired',
  'unsubscribed',
  'error',
]

export function isConfirmStatus(value: string | undefined): value is ConfirmStatus {
  return CONFIRM_STATUSES.includes(value as ConfirmStatus)
}

export const confirmCopy: Record<
  Locale,
  Record<ConfirmStatus, { title: string; body: string }>
> = {
  zh: {
    ok: {
      title: '訂閱完成',
      body: '謝謝你。之後的新作品與活動消息會寄到你的信箱。',
    },
    invalid: {
      title: '這個確認連結無效',
      body: '請重新訂閱，或來信 tina@tinakuobooks.com。',
    },
    expired: {
      title: '這個確認連結已過期',
      body: '請重新訂閱，我們會再寄一封確認信。',
    },
    unsubscribed: {
      title: '這個信箱已取消訂閱',
      body: '請來信 tina@tinakuobooks.com 重新加入。',
    },
    error: {
      title: '訂閱確認沒有完成',
      body: '請稍後再試，或來信 tina@tinakuobooks.com。',
    },
  },
  en: {
    ok: {
      title: 'Subscription confirmed',
      body: 'Thank you. News about new works and events will arrive in your inbox.',
    },
    invalid: {
      title: 'This confirmation link is invalid',
      body: 'Subscribe again, or email tina@tinakuobooks.com.',
    },
    expired: {
      title: 'This confirmation link has expired',
      body: 'Subscribe again and we will send a new confirmation email.',
    },
    unsubscribed: {
      title: 'This address is unsubscribed',
      body: 'Email tina@tinakuobooks.com to rejoin.',
    },
    error: {
      title: 'We could not finish confirming',
      body: 'Try again later, or email tina@tinakuobooks.com.',
    },
  },
}
