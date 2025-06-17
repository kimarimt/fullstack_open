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
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
