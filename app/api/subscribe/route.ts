import { absoluteUrl } from '@/lib/site'
import {
  SUBSCRIBE_CONFIRM_PATH,
  SUBSCRIBE_LIMITS,
  buildConfirmationEmail,
} from '@/lib/subscribe'
import { signConfirmToken } from '@/lib/subscribe-token'
import { clientIp, verifyTurnstile } from '@/lib/turnstile'
import { EMAIL_PATTERN } from '@/lib/validation'
import type { Locale } from '@/lib/i18n'

export const runtime = 'nodejs'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const REPLY_TO = 'tina@tinakuobooks.com'
const DEFAULT_FROM = 'Tina Kuo <website@tinakuobooks.com>'

// Terraform-free limiter: one bucket per serverless instance, same trade-off as
// the inquiry route. A distributed limiter would need a store this site lacks.
const recentByIp = new Map<string, number[]>()
const recentByEmail = new Map<string, number[]>()

function json(body: { error: string; fields?: string[] } | { ok: true }, status: number): Response {
  return Response.json(body, { status })
}

function isRateLimited(bucket: Map<string, number[]>, key: string, limit: number): boolean {
  const now = Date.now()
  const cutoff = now - SUBSCRIBE_LIMITS.windowMs

  if (bucket.size > 5000) {
    for (const [entry, stamps] of bucket) {
      if (!stamps.some((stamp) => stamp > cutoff)) bucket.delete(entry)
    }
  }

  const stamps = (bucket.get(key) ?? []).filter((stamp) => stamp > cutoff)
  stamps.push(now)
  bucket.set(key, stamps)

  return stamps.length > limit
}

export async function POST(request: Request): Promise<Response> {
  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > SUBSCRIBE_LIMITS.bodyBytes) {
    return json({ error: 'payload_too_large' }, 413)
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return json({ error: 'invalid_request' }, 400)
  }
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return json({ error: 'invalid_request' }, 400)
  }
  const payload = raw as Record<string, unknown>

  // Honeypot: answer as if subscribed so a script learns nothing from the reply.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return json({ ok: true }, 200)
  }

  const ip = clientIp(request)
  if (isRateLimited(recentByIp, ip, SUBSCRIBE_LIMITS.perIpPerWindow)) {
    return json({ error: 'rate_limited' }, 429)
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : ''
  const validEmail =
    email.length > 0 && email.length <= SUBSCRIBE_LIMITS.email && EMAIL_PATTERN.test(email)
  // Malformed addresses have no identity worth counting, and keying them here
  // would let one shared `''` bucket answer 429 where 422 is the honest reply.
  // The IP bucket already covers that traffic.
  if (validEmail && isRateLimited(recentByEmail, email, SUBSCRIBE_LIMITS.perEmailPerWindow)) {
    return json({ error: 'rate_limited' }, 429)
  }

  const fields: string[] = []

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  if (name.length < 1 || name.length > SUBSCRIBE_LIMITS.name) fields.push('name')

  if (!validEmail) fields.push('email')

  const locale: Locale = payload.locale === 'en' ? 'en' : 'zh'
  if (payload.locale !== undefined && payload.locale !== 'zh' && payload.locale !== 'en') {
    fields.push('locale')
  }

  if (fields.length > 0) {
    return json({ error: 'invalid_fields', fields }, 422)
  }

  const apiKey = process.env.RESEND_API_KEY
  const contactsKey = process.env.RESEND_CONTACTS_API_KEY
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID
  const confirmSecret = process.env.SUBSCRIBE_CONFIRM_SECRET
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  const missing = [
    apiKey ? null : 'RESEND_API_KEY',
    contactsKey ? null : 'RESEND_CONTACTS_API_KEY',
    segmentId ? null : 'RESEND_NEWSLETTER_SEGMENT_ID',
    confirmSecret ? null : 'SUBSCRIBE_CONFIRM_SECRET',
    turnstileSecret ? null : 'TURNSTILE_SECRET_KEY',
  ].filter((entry): entry is string => entry !== null)
  if (!apiKey || !contactsKey || !segmentId || !confirmSecret || !turnstileSecret) {
    console.error(`subscribe: ${missing.join(', ')} not set`)
    return json({ error: 'not_configured' }, 503)
  }

  const turnstileToken =
    typeof payload.turnstileToken === 'string' ? payload.turnstileToken : ''
  if (
    turnstileToken.length > SUBSCRIBE_LIMITS.turnstileToken ||
    !(await verifyTurnstile(turnstileSecret, turnstileToken, ip))
  ) {
    return json({ error: 'captcha_failed' }, 422)
  }

  const token = signConfirmToken(
    { email, name, locale, iat: Date.now() },
    confirmSecret,
  )
  const confirmPath = `${SUBSCRIBE_CONFIRM_PATH}?token=${encodeURIComponent(token)}`
  // Canonical origin by default: deriving it from the Host header would let a
  // spoofed request put an attacker's domain in the emailed link. The override
  // exists so a local or preview deploy can confirm against itself.
  let confirmUrl = absoluteUrl(confirmPath)
  const originOverride = process.env.SUBSCRIBE_SITE_URL?.trim()
  if (originOverride) {
    try {
      confirmUrl = new URL(confirmPath, originOverride).toString()
    } catch {
      console.error('subscribe: SUBSCRIBE_SITE_URL is not an absolute URL')
    }
  }
  const message = buildConfirmationEmail(name, locale, confirmUrl)

  let response: Response
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.SUBSCRIBE_FROM_EMAIL?.trim() || DEFAULT_FROM,
        to: [email],
        reply_to: REPLY_TO,
        subject: message.subject,
        text: message.text,
        html: message.html,
      }),
    })
  } catch (error) {
    console.error('subscribe: Resend request failed', error)
    return json({ error: 'send_failed' }, 502)
  }

  if (!response.ok) {
    const detail = (await response.json().catch(() => null)) as {
      name?: string
      message?: string
    } | null
    console.error(
      'subscribe: Resend rejected the message',
      response.status,
      detail?.name ?? '',
      detail?.message ?? '',
    )
    return json({ error: 'send_failed' }, 502)
  }

  return json({ ok: true }, 200)
}
