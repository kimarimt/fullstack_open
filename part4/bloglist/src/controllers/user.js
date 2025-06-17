import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).send(savedUser)
})

export default router
