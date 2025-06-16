import assert from 'node:assert'
import { describe, test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import helper from './test_helper.js'

const api = supertest(app)
const baseUrl = '/api/blogs'

describe('BlogAPI test', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const blogPromises = blogObjects.map(blogObject => blogObject.save())
    await Promise.all(blogPromises)
  })

  describe('GET all blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get(baseUrl)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const res = await api.get(baseUrl)
      assert.strictEqual(res.body.length, helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
      const res = await api.get(baseUrl)
      const contents = res.body.map(b => b.title)
      assert.strictEqual(contents.includes('React patterns'), true)
    })

    test('blog contains the \'id\' property', async () => {
      const blogs = await helper.blogsInDB()
      const firstBlog = blogs[0]
      assert('id' in firstBlog)
    })
  })

  describe('POST new blog', () => {
    test('a valid blog is saved to the database', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 12,
      }

      await api
        .post(baseUrl)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogAtEnd.map(b => b.title)
      assert(titles.includes('TDD harms architecture'))
    })

    test('blog\'s \'likes\' property defaults to 0, if it\'s missing from request body', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      }

      await api
        .post(baseUrl)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogAtEnd = await helper.blogsInDB()
      const lastblog = blogAtEnd[blogAtEnd.length - 1]
      assert.strictEqual(lastblog.likes, 0)
    })

    test('blog is invalid if \'title\' is missing from request', async () => {
      const newBlog = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      }

      const res = await api
        .post(baseUrl)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const errMessage = helper.getErrMessage(res, 'title: ')
      assert.strictEqual(errMessage, 'blog title is required')
    })

    test('blog is invalid if \'url\' is missing from request', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
      }

      const res = await api
        .post(baseUrl)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const errMessage = helper.getErrMessage(res, 'url: ')
      assert.strictEqual(errMessage, 'blog url is required')
    })
  })

  describe('DELETE blog', async () => {
    test('a blog with a valid id is successfully deleted', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`${baseUrl}/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('deleting a blog not found in the database show return a status code of 404', async () => {
      const id = '68503112d4e809462350fabd'

      await api
        .delete(`${baseUrl}/${id}`)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  after(() => {
    mongoose.connection.close()
  })
})
