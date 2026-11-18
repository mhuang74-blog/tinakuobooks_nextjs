import { expect, test, type Page } from '@playwright/test'

// The suite builds with Cloudflare's always-passing test sitekey, so the widget
// mounts, but no challenge is fetched: the API stub answers with a fixed token.
// Passed as source text because Playwright serializes function scripts verbatim.
async function stubTurnstile(page: Page) {
  await page.addInitScript({
    content: `window.turnstile = {
  render: function (_container, options) {
    if (options && options.callback) options.callback('test-token')
    return 'test-widget'
  },
  reset: function () {},
  remove: function () {},
};`,
  })
}

test.describe('Chinese home', () => {
  test('renders the hero, featured work, and the sixteen-work shelf', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1, name: '郭瀞婷' })).toBeVisible()
    await expect(page.locator('aside.feature')).toBeVisible()
    await expect(
      page.locator('aside.feature').getByRole('heading', { level: 2, name: '《暗號偵探社》' }),
    ).toBeVisible()

    await expect(page.locator('.shelf article')).toHaveCount(16)
    await expect(page.locator('#result-count')).toHaveText('共 16 部作品')
  })

  test('filters the shelf and resets it', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: '繪本', exact: true }).click()
    await expect(page.locator('#result-count')).toHaveText('顯示 3 部，共 16 部')
    await expect(page.locator('.shelf article')).toHaveCount(3)

    await page.getByRole('button', { name: '重置篩選' }).click()
    await expect(page.locator('#result-count')).toHaveText('共 16 部作品')
    await expect(page.locator('.shelf article')).toHaveCount(16)
  })

  test('opens a work dialog, shows facts, and restores focus on Escape', async ({ page }) => {
    await page.goto('/')

    const trigger = page.getByRole('button', { name: '查看《57號小豹》的介紹' })
    await trigger.click()

    const dialog = page.getByRole('dialog', { name: '《57號小豹》' })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('.fact-list dd')).toHaveCount(4)
    await expect(dialog.locator('.fact-list')).toContainText('繪本')

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('inquiry form validates, submits, and resets', async ({ page }) => {
    await stubTurnstile(page)
    await page.goto('/')

    let submitted: unknown
    await page.route('**/api/inquiry', async (route) => {
      submitted = route.request().postDataJSON()
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    await page.locator('#f-message').fill('短短')
    await page.locator('#f-message').blur()
    await expect(page.locator('#f-message-error')).toBeVisible()

    await page.locator('#form-submit').click()
    await expect(page.locator('#summary-list a')).toHaveCount(4)
    await expect(page.locator('#f-name')).toBeFocused()

    await page.locator('#f-name').fill('林小姐')
    await page.locator('#f-topic').selectOption('rights')
    await page.locator('#f-email').fill('reader@example.com')
    await page.locator('#f-message').fill('想請教《57號小豹》的授權方式，謝謝。')
    await page.locator('#form-submit').click()

    const success = page.locator('#form-success')
    await expect(success).toBeVisible()
    await expect(success.getByRole('heading', { name: '信已經寄出了' })).toBeFocused()
    await expect(success).toContainText('林小姐')

    expect(submitted).toMatchObject({
      name: '林小姐',
      org: '',
      topic: 'rights',
      email: 'reader@example.com',
      message: '想請教《57號小豹》的授權方式，謝謝。',
      website: '',
      turnstileToken: 'test-token',
      locale: 'zh',
    })

    await page.getByRole('button', { name: '再寫一封' }).click()
    await expect(page.locator('#inquiry-form')).toBeVisible()
    await expect(page.locator('#form-success')).toBeHidden()
    await expect(page.locator('#f-name')).toBeFocused()
  })

  test('inquiry form keeps the message when the send fails', async ({ page }) => {
    await stubTurnstile(page)
    await page.route('**/api/inquiry', (route) =>
      route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'send_failed' }),
      }),
    )

    await page.goto('/')
    await page.locator('#f-name').fill('林小姐')
    await page.locator('#f-topic').selectOption('rights')
    await page.locator('#f-email').fill('reader@example.com')
    await page.locator('#f-message').fill('想請教《57號小豹》的授權方式，謝謝。')
    await page.locator('#form-submit').click()

    await expect(page.locator('.form-error')).toHaveText('信沒有送出，請稍後再試一次。')
    await expect(page.locator('#inquiry-form')).toBeVisible()
    await expect(page.locator('#f-message')).toHaveValue('想請教《57號小豹》的授權方式，謝謝。')
    await expect(page.locator('#form-submit')).toBeEnabled()
    await expect(page.locator('#form-success')).toBeHidden()
  })

  test('every shelf cover is portrait', async ({ page }) => {
    await page.goto('/')
    const images = page.locator('.shelf article .cover-img')
    for (let i = 0; i < (await images.count()); i++) {
      await images.nth(i).scrollIntoViewIfNeeded()
      await images.nth(i).evaluate((img: HTMLImageElement) => img.decode())
    }
    const ratios = await images.evaluateAll((nodes) =>
      nodes.map((node) => {
        const img = node as HTMLImageElement
        return { src: img.getAttribute('src') ?? '', ratio: img.naturalWidth / img.naturalHeight }
      }),
    )
    expect(ratios).toHaveLength(16)
    for (const { src, ratio } of ratios) expect(ratio, src).toBeLessThan(1)
  })
})

test.describe('Chinese site', () => {
  test('works index searches, filters, sorts, and syncs the URL', async ({ page }) => {
    await page.goto('/works')

    const status = page.getByRole('status')
    const search = page.getByLabel('搜尋作品')
    await expect(page.locator('main article')).toHaveCount(17)

    await search.fill('豹')
    await expect(status).toHaveText('2 件作品')
    await expect(page).toHaveURL(/\/works\?q=%E8%B1%B9$/)
    await expect(page.locator('main article')).toHaveCount(2)

    await page.getByRole('button', { name: '清除篩選' }).click()
    await expect(status).toHaveText('17 件作品')

    await page.getByRole('button', { name: '繪本', exact: true }).click()
    await expect(status).toHaveText('3 件作品')
    await expect(page.locator('main article')).toHaveCount(3)
    await expect(page).toHaveURL(/collection=picture-book/)

    await page.getByLabel('排序').selectOption('title')
    await expect(page).toHaveURL(/sort=title/)

    await page.getByRole('button', { name: '全部', exact: true }).click()
    await expect(status).toHaveText('17 件作品')
    await expect(page.locator('main article')).toHaveCount(17)
  })

  test('work page links to its English counterpart', async ({ page }) => {
    await page.goto('/57號小豹')
    await expect(page.getByRole('heading', { level: 1, name: '57號小豹' })).toBeVisible()
    await expect(page.locator('#contents')).toContainText('作品內容')

    await page.getByRole('link', { name: '切換到英文版' }).click()
    await expect(page).toHaveURL(/\/en\/works\/little-leopard-no-57$/)
    await expect(
      page.getByRole('heading', { level: 1, name: 'Little Leopard No. 57' }),
    ).toBeVisible()
  })

  test('legacy trailing-slash routes keep working', async ({ page }) => {
    const pictureBook = await page.goto('/tag/picture-book/')
    expect(pictureBook?.status()).toBe(200)
    await expect(page.locator('main article')).toHaveCount(3)

    const author = await page.goto('/author/tina/')
    expect(author?.status()).toBe(200)
    await expect(page.locator('main article')).toHaveCount(16)

    const about = await page.goto('/about/')
    expect(about?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1, name: '關於' })).toBeVisible()
  })

  test('custom 404 page renders', async ({ page }) => {
    const response = await page.goto('/404')
    expect(response?.status()).toBe(404)
    await expect(page.locator('[data-custom-404]')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: '找不到頁面' })).toBeVisible()
  })

  test('unknown URLs render the shared 404', async ({ page }) => {
    const response = await page.goto('/no-such-page')
    expect(response?.status()).toBe(404)
    await expect(page.locator('[data-custom-404]')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: '找不到頁面' })).toBeVisible()
  })

  test('subscribe dialog opens, contains the Mailchimp form, and closes on Escape', async ({
    page,
  }) => {
    await page.goto('/')

    await page.getByRole('button', { name: '訂閱', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: '訂閱新作品通知' })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('form[action*="list-manage"]')).toBeVisible()
    await expect(dialog.locator('input[name^="b_"]')).toHaveCount(1)

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('mobile menu toggles, closes on Escape, and restores focus', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const trigger = page.getByRole('button', { name: '選單', exact: true })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const panel = page.locator('#mobile-menu')
    await expect(panel).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('mobile menu closes after choosing a section', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const trigger = page.getByRole('button', { name: '選單', exact: true })
    await trigger.click()
    const panel = page.locator('#mobile-menu')
    await panel.getByRole('link', { name: '作品', exact: true }).click()
    await expect(panel).toBeHidden()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})

test.describe('English site', () => {
  test('home renders the mirrored portfolio and opens a dialog', async ({ page }) => {
    const response = await page.goto('/en')
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1, name: 'Tina Kuo' })).toBeVisible()
    await expect(page.locator('.shelf article')).toHaveCount(16)

    await page.getByRole('button', { name: 'Open The Secret Code Detective Club' }).click()
    const dialog = page.getByRole('dialog', { name: 'The Secret Code Detective Club' })
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('works index searches and filters', async ({ page }) => {
    await page.goto('/en/works')

    const status = page.getByRole('status')
    const search = page.getByLabel('Search works')
    await expect(page.locator('main article')).toHaveCount(17)

    await search.fill('leopard')
    await expect(status).toHaveText('2 works')
    await expect(page.locator('main article')).toHaveCount(2)

    await page.getByRole('button', { name: 'Clear filters' }).click()
    await page.getByRole('button', { name: 'Picture Book', exact: true }).click()
    await expect(status).toHaveText('3 works')
    await expect(page.locator('main article')).toHaveCount(3)
  })

  test('about page renders in English', async ({ page }) => {
    const response = await page.goto('/en/about')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible()
  })
})

test.describe('Feeds and sitemap', () => {
  test('feeds and sitemap respond with the expected content', async ({ request }) => {
    const atom = await request.get('/feed.xml')
    expect(atom.status()).toBe(200)
    expect(atom.headers()['content-type']).toContain('xml')
    expect(await atom.text()).toContain('57號小豹')

    const rss = await request.get('/atom.xml')
    expect(rss.status()).toBe(200)
    expect(rss.headers()['content-type']).toContain('xml')
    expect(await rss.text()).toContain('57號小豹')

    const enFeed = await request.get('/en/feed.xml')
    expect(enFeed.status()).toBe(200)
    expect(await enFeed.text()).toContain('Little Leopard No. 57')

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    const sitemapText = await sitemap.text()
    expect(sitemapText).toContain(
      'https://www.tinakuobooks.com/en/works/little-leopard-no-57',
    )
    expect(sitemapText).toContain(
      'https://www.tinakuobooks.com/57%E8%99%9F%E5%B0%8F%E8%B1%B9',
    )

    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain('Sitemap:')
  })
})
