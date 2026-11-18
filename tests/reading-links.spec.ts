import { expect, test } from '@playwright/test'

test('reading cards link to individual work pages', async ({ page }) => {
  await page.goto('/')
  const zhHrefs = await page.locator('#reading a').evaluateAll((nodes) =>
    nodes.map((node) => decodeURIComponent(new URL((node as HTMLAnchorElement).href).pathname)),
  )
  for (const path of [
    '/丁小飛校園日記1-時光膠囊的祕密',
    '/動物星球偵探事件簿',
    '/動物星球偵探事件簿2-推理要在放學後',
    '/暗號偵探社',
    '/記憶邊境-河川-火林-烏雲光',
  ]) expect(zhHrefs).toContain(path)

  await page.goto('/')
  await page.locator('#reading').getByRole('link', { name: '《暗號偵探社》', exact: true }).first().click()
  await page.waitForURL((url) => decodeURIComponent(url.pathname) === '/暗號偵探社')
  await expect(page.getByRole('heading', { level: 1, name: '暗號偵探社' })).toBeVisible()

  await page.goto('/en')
  const enHrefs = await page.locator('#reading a').evaluateAll((nodes) =>
    nodes.map((node) => new URL((node as HTMLAnchorElement).href).pathname),
  )
  for (const path of [
    '/en/works/ding-xiaofei-school-diary-1-time-capsule-secret',
    '/en/works/animal-planet-detective-files',
    '/en/works/animal-planet-detective-files-2-mystery-after-school',
    '/en/works/secret-code-detective-club',
    '/en/works/memory-border-river-fire-forest-cloud-light',
  ]) expect(enHrefs).toContain(path)
})
