import assert from 'node:assert'
import { describe, test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import helper from './test_helper.js'

const api = supertest(app)
const baseUrl = '/api/blogs'

describe('BlogAPI testing', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    const blogObjects = helper.initialBlogs.map(blog => new Blog({
      ...blog,
      user: user.id,
    }))

    const blogPromises = blogObjects.map(blogObject => blogObject.save())
    await Promise.all(blogPromises)

    user.blogs.push(blogObjects[0])
    user.blogs.push(blogObjects[1])

    await user.save()
  })

  describe.only('POST new blog', () => {
    beforeEach(async () => {
      const { body } = await api
        .post('/api/login')
        .send({ username: 'root', password: 'secret' })

      helper.token = body.token
    })

    test('a valid blog is saved to the database', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 12,
      }

      const usersAtStart = await helper.usersInDB()
      const firstUser = usersAtStart[0]

      await api
        .post(baseUrl)
        .send(newBlog)
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

      const usersAtEnd = await helper.usersInDB()
      const updatedUser = usersAtEnd[0]
      assert.strictEqual(updatedUser.blogs.length, firstUser.blogs.length + 1)
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
        .set('Authorization', `Bearer ${helper.token}`)
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
        .set('Authorization', `Bearer ${helper.token}`)
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
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const errMessage = helper.getErrMessage(res, 'url: ')
      assert.strictEqual(errMessage, 'blog url is required')
    })

    test('blog is not created if user token isn\'t provided', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 12,
      }

      const res = await api
        .post(baseUrl)
        .send(newBlog)
        .expect(401)

      assert.strictEqual(res.body.error, 'token invalid or it hasn\'t been provided')
    })
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

    test('blogs have a \'user\' property', async () => {
      const blogs = await helper.blogsInDB()
      const firstBlog = blogs[0]
      assert('user' in firstBlog)
    })
  })

  describe('GET single blog', () => {
    test('A 200 status code is returned if blog is found', async () => {
      const blogs = await helper.blogsInDB()
      const firstBlog = blogs[0]

      const res = await api
        .get(`${baseUrl}/${firstBlog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      delete res.body.user
      delete firstBlog.user

      assert.deepStrictEqual(res.body, firstBlog)
    })

    test('A 404 status code is return if blog isn\'t found', async () => {
      const id = '6850a435f4de65bf5b3f0f17'

      await api
        .get(`${baseUrl}/${id}`)
        .expect(404)

      const blogs = await helper.blogsInDB()
      assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })

    test('blogs have a \'user\' property', async () => {
      const blogs = await helper.blogsInDB()
      const firstBlog = blogs[0]

      const res = await api
        .get(`${baseUrl}/${firstBlog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert('user' in res.body)
    })
  })

  describe('PUT blog', () => {
    test('a valid blog can be liked', async () => {
      const blogs = await helper.blogsInDB()
      const blogToUpdate = blogs[0]

      const res = await api
        .put(`${baseUrl}/${blogToUpdate.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(res.body.likes, blogToUpdate.likes + 1)
    })

    test('liking a blog that isn\'t in the database returns a 404', async () => {
      const id = '6850a0ff87fc0576bf3b7536'

      await api
        .put(`${baseUrl}/${id}`)
        .expect(404)
    })
  })

  describe('DELETE blog', () => {
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

  after(async () => {
    await mongoose.connection.close()
  })
})
