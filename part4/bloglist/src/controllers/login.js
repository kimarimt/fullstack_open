import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

dotenv.config()

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : bcrypt.compareSync(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).send({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 },
  )

  res.json({
    token,
    username: user.username,
    name: user.name,
  })
})

export default router
