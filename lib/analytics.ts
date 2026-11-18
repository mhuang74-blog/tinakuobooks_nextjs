type Gtag = (...args: unknown[]) => void

/**
 * GA4 is loaded in production only; this is a no-op when the tag is absent or
 * during server rendering. Callers must not pass personal data.
 */
export function trackEvent(
  name: string,
  params: Record<string, string | number>,
): void {
  if (typeof window === 'undefined') return
  const gtag = (window as Window & { gtag?: Gtag }).gtag
  gtag?.('event', name, params)
}
