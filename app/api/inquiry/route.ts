import { homeCopy } from '@/content/portfolio'
import { INQUIRY_LIMITS, type InquiryResponse } from '@/lib/inquiry'
import type { Locale } from '@/lib/i18n'
import { clientIp, verifyTurnstile } from '@/lib/turnstile'
import { EMAIL_PATTERN } from '@/lib/validation'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const INQUIRY_TO = 'tina@tinakuobooks.com'
const DEFAULT_FROM = 'Tina Kuo Website <website@tinakuobooks.com>'
const TOPICS = homeCopy.zh.contact.form.topics

const recentSubmissions = new Map<string, number[]>()

function json(body: InquiryResponse, status: number): Response {
  return Response.json(body, { status })
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - INQUIRY_LIMITS.windowMs

  if (recentSubmissions.size > 5000) {
    for (const [key, stamps] of recentSubmissions) {
      if (!stamps.some((stamp) => stamp > cutoff)) recentSubmissions.delete(key)
    }
  }

  const stamps = (recentSubmissions.get(ip) ?? []).filter((stamp) => stamp > cutoff)
  stamps.push(now)
  recentSubmissions.set(ip, stamps)

  return stamps.length > INQUIRY_LIMITS.perIpPerWindow
}

export async function POST(request: Request): Promise<Response> {
  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > INQUIRY_LIMITS.bodyBytes) {
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

  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return json({ ok: true }, 200)
  }

  const ip = clientIp(request)
  if (isRateLimited(ip)) {
    return json({ error: 'rate_limited' }, 429)
  }

  const fields: string[] = []

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  if (name.length < 1 || name.length > INQUIRY_LIMITS.name) fields.push('name')

  const topic = TOPICS.find((entry) => entry.value === payload.topic)
  if (!topic) fields.push('topic')

  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  if (email.length > INQUIRY_LIMITS.email || !EMAIL_PATTERN.test(email)) fields.push('email')

  const message = typeof payload.message === 'string' ? payload.message.trim() : ''
  if (message.length < 10 || message.length > INQUIRY_LIMITS.message) fields.push('message')

  if (fields.length > 0) {
    return json({ error: 'invalid_fields', fields }, 422)
  }
  if (!topic) {
    return json({ error: 'invalid_fields', fields: ['topic'] }, 422)
  }

  const org =
    typeof payload.org === 'string' ? payload.org.trim().slice(0, INQUIRY_LIMITS.org) : ''
  const locale: Locale = payload.locale === 'en' ? 'en' : 'zh'

  const apiKey = process.env.RESEND_API_KEY
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  const missing = [
    apiKey ? null : 'RESEND_API_KEY',
    turnstileSecret ? null : 'TURNSTILE_SECRET_KEY',
  ].filter((entry): entry is string => entry !== null)
  if (!apiKey || !turnstileSecret) {
    console.error(`inquiry: ${missing.join(', ')} not set`)
    return json({ error: 'not_configured' }, 503)
  }

  const token = typeof payload.turnstileToken === 'string' ? payload.turnstileToken : ''
  if (token.length > INQUIRY_LIMITS.turnstileToken) {
    return json({ error: 'captcha_failed' }, 422)
  }
  if (!(await verifyTurnstile(turnstileSecret, token, ip))) {
    return json({ error: 'captcha_failed' }, 422)
  }

  const topicLabel = topic.label.zh
  const subjectName = name.replace(/[\r\n\u2028\u2029]+/g, ' ')
  const subject = `[網站來信] ${topicLabel} — ${subjectName}`
  const text = [
    `稱呼：${name}`,
    `機構：${org || '—'}`,
    `事由：${topicLabel}`,
    `回信信箱：${email}`,
    '',
    '訊息：',
    message,
    '',
    `— 語言：${locale} · ${new Date().toISOString()}`,
  ].join('\n')

  let response: Response
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL?.trim() || DEFAULT_FROM,
        to: [INQUIRY_TO],
        reply_to: email,
        subject,
        text,
      }),
    })
  } catch (error) {
    console.error('inquiry: Resend request failed', error)
    return json({ error: 'send_failed' }, 502)
  }

  if (!response.ok) {
    const detail = (await response.json().catch(() => null)) as {
      name?: string
      message?: string
    } | null
    console.error(
      'inquiry: Resend rejected the message',
      response.status,
      detail?.name ?? '',
      detail?.message ?? '',
    )
    return json({ error: 'send_failed' }, 502)
  }

  return json({ ok: true }, 200)
}
