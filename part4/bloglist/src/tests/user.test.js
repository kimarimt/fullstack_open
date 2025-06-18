import assert from 'node:assert'
import { describe, test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import supertest from 'supertest'
import app from '../app.js'
import User from '../models/user.js'
import helper from './test_helper.js'

const api = supertest(app)
const baseUrl = '/api/users'

describe('UserAPI testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  describe('POST newUser', () => {
    test('a valid user is created', async () => {
      const usersAtStart = await helper.usersInDB()

      const newUser = {
        username: 'agerman',
        name: 'Alec German',
        password: '081093',
      }

      await api
        .post(baseUrl)
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDB()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creating a user fails their username is missing', async () => {
      const usersAtStart = await helper.usersInDB()

      const newUser = {
        name: 'Alec German',
        password: '081093',
      }

      const res = await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDB()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)

      const errMessage = helper.getErrMessage(res, 'username: ')
      assert.strictEqual(errMessage, 'username is required')
    })

    test('creating a user fails if username isn\'t unique', async () => {
      const newUser = {
        username: 'root',
        name: 'John Doe',
        password: 'randomPassword',
      }

      const res = await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)

      assert.strictEqual(res.body.error, 'user already exists')
    })

    test('creating a user fails if username isn\'t at least three characters', async () => {
      const newUser = {
        username: 'j',
        name: 'John Doe',
        password: 'randomPassword',
      }

      const res = await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)

      assert(res.body.error.includes('username must be a least 3 characters long'))
    })

    test('creating a user fails if password is missing', async () => {
      const newUser = {
        username: 'jdoe',
        name: 'John Doe',
      }

      const res = await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)

      assert.strictEqual(res.body.error, 'password is required')
    })

    test('creating a user fails if password is less than 3 characters', async () => {
      const newUser = {
        username: 'jdoe',
        name: 'John Doe',
        password: 'no',
      }

      const res = await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)

      assert.strictEqual(res.body.error, 'password must be at least three characters long')
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
