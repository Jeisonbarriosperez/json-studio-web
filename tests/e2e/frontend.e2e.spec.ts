import { expect, test } from '@playwright/test'

test.describe('Sitio público', () => {
  test('la portada carga con el nombre de la marca', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Json Studio/)
    await expect(page.locator('h1').first()).toHaveText('Json Studio')
  })
})
