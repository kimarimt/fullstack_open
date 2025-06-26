import { test, expect } from '@playwright/test'
import testHelper from './test_helper.js'

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
      await testHelper.loginWith(page, 'agerman', '081093')
      await expect(page.getByText('Blog App')).toBeVisible()
      await expect(page.getByText('Alec German logged in')).toBeVisible()
    })

    test('fails with the wrong credentials', async ({ page }) => {
      await testHelper.loginWith(page, 'jdoe', 'wrong')
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await testHelper.loginWith(page, 'agerman', '081093')
    })

    test('a blog is successfully added by a valid user', async ({ page }) => {
      const blog = {
        title: '[ On | No ] syntactic support for error handling',
        author: 'Robert Griesemer',
        url: 'https://go.dev/blog/error-syntax'
      }

      await testHelper.addBlog(page, blog)
      await expect(page.getByText(`${blog.title} | ${blog.author}`)).toBeVisible()
    })
  })
})