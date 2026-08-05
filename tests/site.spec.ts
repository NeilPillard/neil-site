import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/#slide-1')
})

test('renders every section without horizontal page overflow', async ({ page }) => {
  await expect(page.locator('.investor-section')).toHaveCount(10)

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBe(0)
})

test('keeps Neil’s founder profile readable at every viewport', async ({ page }) => {
  await page.goto('/#slide-6')

  const profile = page.locator('#slide-6')
  const content = profile.locator('.section-content')
  const identity = profile.locator('.founder-profile__identity')
  const achievements = profile.locator('.achievement-list')

  await expect(identity.getByRole('heading')).toBeVisible()
  await expect(achievements).toBeVisible()

  const layout = await content.evaluate(
    (element) => getComputedStyle(element).gridTemplateColumns,
  )
  const width = await page.evaluate(() => window.innerWidth)

  if (width <= 840) {
    expect(layout.split(' ').length).toBe(1)
  } else {
    expect(layout.split(' ').length).toBe(2)
  }
})

test('keeps hash navigation and contact links functional', async ({ page }) => {
  const menuToggle = page.getByRole('button', { name: 'Open navigation' })
  if (await menuToggle.isVisible()) {
    await menuToggle.click()
  }

  await page.getByRole('link', { name: 'Experience', exact: true }).click()
  await expect(page).toHaveURL(/#slide-3$/)
  await expect(page.locator('#slide-3')).toBeInViewport()

  if (await menuToggle.isVisible()) {
    await menuToggle.click()
  }

  await page
    .getByRole('navigation', { name: 'Investor overview' })
    .getByRole('link', { name: 'Connect', exact: true })
    .click()
  await expect(page).toHaveURL(/#slide-10$/)
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

test('renders the dedicated waitlist page and required form fields', async ({ page }) => {
  await page.goto('/waitlist')

  await expect(
    page.getByRole('heading', { name: 'Your next student essential.' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Save your spot.' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Your name' })).toHaveAttribute(
    'required',
    '',
  )
  await expect(page.getByRole('textbox', { name: 'Email address' })).toHaveAttribute(
    'required',
    '',
  )
  await expect(page.getByRole('textbox', { name: /Mobile number/i })).toHaveAttribute(
    'required',
    '',
  )
  await expect(page.getByRole('combobox', { name: 'Country code' })).toBeVisible()
  await page.getByRole('combobox', { name: 'Country code' }).selectOption('QA')
  await expect(page.getByRole('combobox', { name: 'Country code' })).toHaveValue('QA')
})
