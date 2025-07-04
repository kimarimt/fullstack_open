import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!password) {
    return res.status(400).send({ error: 'password is required' })
  }
  else if (password.length < 3) {
    return res.status(400).send({ error: 'password must be at least three characters long' })
  }

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

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('blogs', { user: 0 })

  if (!user) {
    return res.status(400).send({ error: 'user not found' })
  }

  res.json(user)
})

export default router
