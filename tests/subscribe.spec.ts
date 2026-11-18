import { expect, test, type APIRequestContext } from '@playwright/test'

// The route keeps an in-process limiter per IP, and the local web server is
// reused between runs, so each request claims its own client address.
function uniqueIp(): string {
  return `198.51.100.${Math.floor(Math.random() * 250) + 1}`
}

function postSubscribe(
  request: APIRequestContext,
  data: Record<string, unknown>,
  ip = uniqueIp(),
) {
  return request.post('/api/subscribe', {
    data,
    headers: { 'cf-connecting-ip': ip },
  })
}

test('rejects an empty payload with field errors', async ({ request }) => {
  const response = await postSubscribe(request, {})

  expect(response.status()).toBe(422)
  expect(await response.json()).toEqual({
    error: 'invalid_fields',
    fields: ['name', 'email'],
  })
})

test('answers the honeypot without sending anything', async ({ request }) => {
  const response = await postSubscribe(request, { website: 'bot' })

  expect(response.status()).toBe(200)
  expect(await response.json()).toEqual({ ok: true })
})

test('redirects an invalid confirmation token to the invalid page', async ({ request }) => {
  const response = await request.get('/api/subscribe/confirm?token=bad')

  expect(response.status()).toBe(200)
  expect(response.url()).toMatch(/\/subscribe\/confirmed\?status=invalid$/)
  expect(await response.text()).toContain('這個確認連結無效')
})
