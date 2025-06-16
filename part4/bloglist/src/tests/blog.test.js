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
      assert.strictEqual('id' in firstBlog, true)
    })
  })

  after(() => {
    mongoose.connection.close()
  })
})
