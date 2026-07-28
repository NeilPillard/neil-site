import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/#slide-1')
})

test('renders every section without horizontal page overflow', async ({ page }) => {
  await expect(page.locator('.investor-section')).toHaveCount(16)

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBe(0)
})

test('keeps hash navigation and contact links functional', async ({ page }) => {
  const menuToggle = page.getByRole('button', { name: 'Open navigation' })
  if (await menuToggle.isVisible()) {
    await menuToggle.click()
  }

  await page.getByRole('link', { name: 'Product', exact: true }).click()
  await expect(page).toHaveURL(/#slide-5$/)
  await expect(page.locator('#slide-5')).toBeInViewport()

  if (await menuToggle.isVisible()) {
    await menuToggle.click()
  }

  await page.getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page).toHaveURL(/#slide-16$/)
  await expect(
    page.getByRole('link', { name: 'neil.j.pillard@gmail.com' }),
  ).toHaveAttribute('href', 'mailto:neil.j.pillard@gmail.com')
})

test('has no automatically detectable accessibility violations', async ({ page }) => {
  await page.waitForTimeout(900)
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()

  const animationDuration = await page
    .locator('.section-header')
    .first()
    .evaluate((element) => getComputedStyle(element).animationDuration)

  expect(['0s', '0.00001s', '1e-05s']).toContain(animationDuration)
})
