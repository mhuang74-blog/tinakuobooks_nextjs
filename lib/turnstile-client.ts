// Turnstile can still be solving when the form is ready, so give the widget
// 30 × 100 ms before blaming the visitor for skipping the check.
const TOKEN_WAIT_STEPS = 30

export async function awaitTurnstileToken(
  read: () => string,
  steps = TOKEN_WAIT_STEPS,
): Promise<string> {
  for (let step = 0; step < steps; step += 1) {
    // Next's browser baseline includes Safari 16.4, which has no
    // Promise.withResolvers, and built-ins are not polyfilled.
    await new Promise<void>((resolve) => window.setTimeout(resolve, 100))
    const token = read()
    if (token) return token
  }
  return ''
}
