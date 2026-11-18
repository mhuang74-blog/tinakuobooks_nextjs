import type { Locale } from '@/lib/i18n'

export const INQUIRY_ENDPOINT = '/api/inquiry'
export const INQUIRY_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const TURNSTILE_SCRIPT =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
export const TURNSTILE_VERIFY_ENDPOINT =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export const INQUIRY_LIMITS = {
  name: 100,
  org: 200,
  email: 254,
  message: 5000,
  turnstileToken: 2048,
  bodyBytes: 20_000,
  perIpPerWindow: 5,
  windowMs: 10 * 60 * 1000,
} as const

export type InquiryPayload = {
  name: string
  org: string
  topic: string
  email: string
  message: string
  website: string
  turnstileToken: string
  locale: Locale
}

export type InquiryResponse =
  | { ok: true }
  | { error: string; fields?: string[] }
