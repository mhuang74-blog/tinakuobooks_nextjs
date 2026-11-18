export const TURNSTILE_SCRIPT =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
export const TURNSTILE_VERIFY_ENDPOINT =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * Cloudflare proxies the site, so the platform header is authoritative; the
 * forwarding chain is the fallback when a request reaches Vercel directly.
 */
export function clientIp(request: Request): string {
  const cloudflare = request.headers.get('cf-connecting-ip')?.trim()
  if (cloudflare) return cloudflare
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || 'unknown'
}

export async function verifyTurnstile(
  secret: string,
  token: string,
  ip: string,
): Promise<boolean> {
  try {
    const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: ip === 'unknown' ? undefined : ip,
      }),
    })

    if (!response.ok) {
      console.error('Turnstile rejected the verification', response.status)
      return false
    }

    const outcome = (await response.json()) as { success?: boolean }
    return outcome.success === true
  } catch (error) {
    console.error('Turnstile request failed', error)
    return false
  }
}
