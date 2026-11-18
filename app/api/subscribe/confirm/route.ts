import type { Locale } from '@/lib/i18n'
import { verifyConfirmToken } from '@/lib/subscribe-token'
import type { ConfirmStatus } from '@/content/subscribe'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const CONTACTS_ENDPOINT = 'https://api.resend.com/contacts'

function redirect(status: ConfirmStatus, locale: Locale = 'zh'): Response {
  const path =
    locale === 'en'
      ? `/en/subscribe/confirmed?status=${status}`
      : `/subscribe/confirmed?status=${status}`
  return new Response(null, {
    status: 303,
    headers: { Location: path, 'Cache-Control': 'no-store' },
  })
}

export async function GET(request: Request): Promise<Response> {
  const token = new URL(request.url).searchParams.get('token')
  const secret = process.env.SUBSCRIBE_CONFIRM_SECRET
  if (!token || !secret) return redirect('invalid')

  const result = verifyConfirmToken(token, secret)
  // Pinned rather than passed through: a new verifier reason must not become an
  // unknown `status=` value the page would quietly render as invalid.
  if (!result.ok) return redirect(result.reason === 'expired' ? 'expired' : 'invalid')

  const { email, name, locale } = result.payload
  const apiKey = process.env.RESEND_CONTACTS_API_KEY
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID
  const topicId = process.env.RESEND_NEWSLETTER_TOPIC_ID
  if (!apiKey || !segmentId) {
    console.error('subscribe confirm: RESEND_CONTACTS_API_KEY or RESEND_NEWSLETTER_SEGMENT_ID not set')
    return redirect('error', locale)
  }

  const authorization = { Authorization: `Bearer ${apiKey}` }
  const path = `${CONTACTS_ENDPOINT}/${encodeURIComponent(email)}`

  // Re-use an existing contact instead of failing on a duplicate, and never
  // resurrect an address that opted out through a broadcast.
  let existing: Response
  try {
    existing = await fetch(path, { headers: authorization })
  } catch (error) {
    console.error('subscribe confirm: contact lookup failed', error)
    return redirect('error', locale)
  }

  if (existing.ok) {
    const contact = (await existing.json().catch(() => null)) as {
      unsubscribed?: boolean
    } | null
    if (contact?.unsubscribed === true) return redirect('unsubscribed', locale)
  } else if (existing.status !== 404) {
    console.error('subscribe confirm: contact lookup rejected', existing.status)
    return redirect('error', locale)
  } else {
    try {
      const created = await fetch(CONTACTS_ENDPOINT, {
        method: 'POST',
        headers: { ...authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_name: name,
          unsubscribed: false,
          properties: { locale },
          segments: [{ id: segmentId }],
          ...(topicId
            ? { topics: [{ id: topicId, subscription: 'opt_in' }] }
            : {}),
        }),
      })
      if (!created.ok) {
        console.error('subscribe confirm: contact creation rejected', created.status)
        return redirect('error', locale)
      }
    } catch (error) {
      console.error('subscribe confirm: contact creation failed', error)
      return redirect('error', locale)
    }
  }

  try {
    const membership = await fetch(`${path}/segments/${segmentId}`, {
      method: 'POST',
      headers: authorization,
    })
    // 409 means the contact is already in the segment, which is the goal.
    if (!membership.ok && membership.status !== 409) {
      console.error('subscribe confirm: segment membership rejected', membership.status)
      return redirect('error', locale)
    }

    if (topicId) {
      // Resend's PATCH contract is a bare array; the published OpenAPI schema
      // (an object with a `topics` key) is wrong and returns 422.
      const topics = await fetch(`${path}/topics`, {
        method: 'PATCH',
        headers: { ...authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify([{ id: topicId, subscription: 'opt_in' }]),
      })
      if (!topics.ok && topics.status !== 409) {
        console.error('subscribe confirm: topic opt-in rejected', topics.status)
        return redirect('error', locale)
      }
    }
  } catch (error) {
    console.error('subscribe confirm: contact update failed', error)
    return redirect('error', locale)
  }

  return redirect('ok', locale)
}
