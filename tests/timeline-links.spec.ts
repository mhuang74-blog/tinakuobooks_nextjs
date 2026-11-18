import { expect, test } from '@playwright/test'

test('timeline works link to individual work pages', async ({ page }) => {
  await page.goto('/')
  const zhHrefs = await page.locator('#about .timeline a').evaluateAll((nodes) =>
    nodes.map((node) => decodeURIComponent(new URL((node as HTMLAnchorElement).href).pathname)),
  )
  for (const path of [
    '/胡阿布偵探事件簿-誰綁架了黑總統',
    '/機器人宅急便2-能寄勇氣嗎',
    '/丁小飛校園日記5-我要成為YouTuber',
    '/機器人宅急便1-什麼都可以寄',
    '/57號小豹',
    '/小兒子報告-沙發有黑洞',
    '/動物星球偵探事件簿2-推理要在放學後',
    '/記憶邊境-河川-火林-烏雲光',
    '/動物星球偵探事件簿',
    '/暗號偵探社',
    '/丁小飛校園日記1-時光膠囊的祕密',
  ]) expect(zhHrefs).toContain(path)

  await page
    .locator('#about .timeline')
    .getByRole('link', { name: '《胡阿布偵探事件簿：誰綁架了黑總統？》', exact: true })
    .click()
  await page.waitForURL((url) => decodeURIComponent(url.pathname) === '/胡阿布偵探事件簿-誰綁架了黑總統')
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: '胡阿布偵探事件簿：誰綁架了黑總統？',
    }),
  ).toBeVisible()

  await page.goto('/en')
  const enHrefs = await page.locator('#about .timeline a').evaluateAll((nodes) =>
    nodes.map((node) => new URL((node as HTMLAnchorElement).href).pathname),
  )
  for (const path of [
    '/en/works/huabu-detective-files-kidnapped-black-president',
    '/en/works/robot-delivery-2-can-you-send-courage',
    '/en/works/ding-xiaofei-school-diary-5-youtuber',
    '/en/works/robot-delivery-1-anything-can-be-sent',
    '/en/works/little-leopard-no-57',
    '/en/works/little-son-report-sofa-black-hole',
    '/en/works/animal-planet-detective-files-2-mystery-after-school',
    '/en/works/memory-border-river-fire-forest-cloud-light',
    '/en/works/animal-planet-detective-files',
    '/en/works/secret-code-detective-club',
    '/en/works/ding-xiaofei-school-diary-1-time-capsule-secret',
  ]) expect(enHrefs).toContain(path)
})
