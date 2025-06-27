import { test, expect } from '@playwright/test'
import testHelper from './test_helper.js'

const baseUrl = 'http://localhost:5173'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post(`${baseUrl}/api/testing/reset`)
    await testHelper.createUser(
      request,
      {
        name: 'Alec German',
        username: 'agerman',
        password: '081093'
      }
    )

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
    const blog = {
      title: '[ On | No ] syntactic support for error handling',
      author: 'Robert Griesemer',
      url: 'https://go.dev/blog/error-syntax',
      likes: 6,
    }

    test.beforeEach(async ({ page }) => {
      await testHelper.loginWith(page, 'agerman', '081093')
      await testHelper.addBlog(page, blog)
    })

    test('a blog is successfully added by a valid user', async ({ page }) => {
      await expect(page.getByText(`${blog.title} | ${blog.author}`)).toBeVisible()
    })

    test('pressing the like button on specific blog increases it\'s count', async ({ page }) => {
      await page.waitForSelector('.blog-item')
      const blogs = await page.locator('.blog-item').all()
      const firstBlog = blogs[0]
      await firstBlog.getByRole('button', { name: 'show' }).click()
      await firstBlog.getByRole('button', { name: 'like' }).click()
      await expect(firstBlog.getByText(`likes ${blog.likes + 1}`)).toBeVisible()
    })

    test('a blog is deleted when the delete button is clicked', async ({ page }) => {
      const firstBlog = page.locator('.blog-item')
      await firstBlog.getByRole('button', { name: 'show' }).click()
      await firstBlog.getByRole('button', { name: 'delete' }).click()
      await expect(firstBlog).not.toBeVisible()
    })

    test('delete button is hidden for users who didn\'t add the blog', async ({ page, request }) => {
      const newUser = {
        name: 'John Doe',
        username: 'jdoe',
        password: 'secret'
      }

      await testHelper.createUser(request, newUser)
      await page.getByRole('button', { name: 'logout' }).click()
      await testHelper.loginWith(page, newUser.username, newUser.password)

      const firstBlog = page.locator('.blog-item')
      await firstBlog.getByRole('button', { name: 'show' }).click()
      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })

    test('blogs are sorted by likes', async ({ page }) => {
      const newBlog = {
        title: 'More predictable benchmarking with testing.B.Loop',
        author: 'Junyang Shao',
        url: 'https://go.dev/blog/testing-b-loop',
        likes: 10,
      }

      await testHelper.addBlog(page, newBlog)
      await expect(page.locator('.blog-item')).toHaveCount(2)
      const blogsAtStart = await page.locator('.blog-item').all()

      const firstBlog = blogsAtStart[0]
      await firstBlog.getByRole('button', { name: 'show' }).click()
      await testHelper.likeBlog(firstBlog)
      await testHelper.likeBlog(firstBlog)
      await testHelper.likeBlog(firstBlog)

      const lastBlog = blogsAtStart[1]
      await lastBlog.getByRole('button', { name: 'show' }).click()
      await testHelper.likeBlog(lastBlog)
      await testHelper.likeBlog(lastBlog)
      await testHelper.likeBlog(lastBlog)
      await testHelper.likeBlog(lastBlog)
      await testHelper.likeBlog(lastBlog)

      const blogsAtEnd = await page.locator('.blog-item').all()
      const blogMaxLikes = blogsAtEnd[0]

      const headerText = await (await blogMaxLikes.getByTestId('header').innerText())
      expect(headerText).toBe(`${newBlog.title} | ${newBlog.author} hide`)
    })
  })
})