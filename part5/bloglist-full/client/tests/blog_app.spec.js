import { test, expect } from '@playwright/test'

const baseUrl = 'http://localhost:5173'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post(`${baseUrl}/api/testing/reset`)
    await request.post(`${baseUrl}/api/users`, {
      data: {
        name: 'Alec German',
        username: 'agerman',
        password: '081093'
      }
    })

    await page.goto(baseUrl)
  })

  test('login form is shown', async ({ page }) => {
    const locator = page.getByText('Log In')
    await expect(locator).toBeVisible()
  })

  test.describe('Logging in user', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('agerman')
      await page.getByTestId('password').fill('081093')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Blog App')).toBeVisible()
      await expect(page.getByText('Alec German logged in')).toBeVisible()
    })

    test('fails with the wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('jdoe')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })
})