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

    test('pressing the like button on specific blog increases it\'s count', async ({ page }) => {
      const blog = {
        title: '[ On | No ] syntactic support for error handling',
        author: 'Robert Griesemer',
        url: 'https://go.dev/blog/error-syntax',
        likes: 0,
      }

      await testHelper.addBlog(page, blog)
      await page.waitForSelector('.blog-item')
      const blogs = await page.locator('.blog-item').all()
      const firstBlog = blogs[0]
      await firstBlog.getByRole('button', { name: 'show' }).click()
      await firstBlog.getByRole('button', { name: 'like' }).click()
      await expect(firstBlog.getByText(`likes ${blog.likes + 1}`)).toBeVisible()
    })

    test('a blog is deleted when the delete button is clicked', async ({ page }) => {
      const blog = {
        title: '[ On | No ] syntactic support for error handling',
        author: 'Robert Griesemer',
        url: 'https://go.dev/blog/error-syntax',
        likes: 0,
      }

      await testHelper.addBlog(page, blog)
      await page.waitForSelector('.blog-item')
      const firstBlog = page.locator('.blog-item')
      await firstBlog.getByRole('button', { name: 'show' }).click()
      await firstBlog.getByRole('button', { name: 'delete' }).click()
      await expect(firstBlog).not.toBeVisible()
    })
  })
})