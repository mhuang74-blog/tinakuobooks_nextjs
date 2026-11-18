import { createHmac, timingSafeEqual } from 'node:crypto'
import { EMAIL_PATTERN } from '@/lib/validation'
import { SUBSCRIBE_LIMITS, type ConfirmPayload } from '@/lib/subscribe'

/**
 * Split from `lib/subscribe.ts` because that module is also imported by the
 * client form, and `node:crypto` cannot enter the browser bundle.
 */
const CLOCK_SKEW_MS = 5 * 60 * 1000

export type ConfirmResult =
  | { ok: true; payload: ConfirmPayload }
  | { ok: false; reason: 'invalid' | 'expired' }

function hmac(secret: string, body: string): string {
  return createHmac('sha256', secret).update(body).digest('base64url')
}

/**
 * Stateless confirmation link: the payload travels in the clear and the HMAC
 * makes it unforgeable, so no server storage is needed between the two requests.
 */
export function signConfirmToken(payload: ConfirmPayload, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url')
  return `${body}.${hmac(secret, body)}`
}

export function verifyConfirmToken(token: string, secret: string): ConfirmResult {
  const parts = token.split('.')
  if (parts.length !== 2) return { ok: false, reason: 'invalid' }
  const [body, signature] = parts
  if (!body || !signature) return { ok: false, reason: 'invalid' }

  const expected = Buffer.from(hmac(secret, body), 'utf8')
  const given = Buffer.from(signature, 'utf8')
  // timingSafeEqual throws on a length mismatch, so compare lengths first; the
  // digest length is fixed and not a secret.
  if (expected.length !== given.length) return { ok: false, reason: 'invalid' }
  if (!timingSafeEqual(expected, given)) return { ok: false, reason: 'invalid' }

  let raw: unknown
  try {
    raw = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  } catch {
    return { ok: false, reason: 'invalid' }
  }
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, reason: 'invalid' }
  }

  const payload = raw as Record<string, unknown>
  const { email, name, locale, iat } = payload

  if (typeof email !== 'string' || email.length > SUBSCRIBE_LIMITS.email) {
    return { ok: false, reason: 'invalid' }
  }
  if (!EMAIL_PATTERN.test(email)) return { ok: false, reason: 'invalid' }
  if (typeof name !== 'string' || name.length < 1 || name.length > SUBSCRIBE_LIMITS.name) {
    return { ok: false, reason: 'invalid' }
  }
  if (locale !== 'zh' && locale !== 'en') return { ok: false, reason: 'invalid' }
  if (typeof iat !== 'number' || !Number.isFinite(iat)) {
    return { ok: false, reason: 'invalid' }
  }

  const now = Date.now()
  if (now - iat > SUBSCRIBE_LIMITS.tokenTtlMs) return { ok: false, reason: 'expired' }
  if (iat - now > CLOCK_SKEW_MS) return { ok: false, reason: 'expired' }

  return { ok: true, payload: { email, name, locale, iat } }
}
