import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js'

dotenv.config()

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('Authorization')

  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  else {
    req.token = null
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    req.user = null
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    req.user = null
  }

  req.user = user
  next()
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  else if (err.name === 'MongooseError' && err.message === 'user already exists') {
    return res.status(400).send({ error: err.message })
  }
  else if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'token invalid or it hasn\'t been provided' })
  }
  else if (err.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'Token expired' })
  }

  next(err)
}

export default {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler,
}
