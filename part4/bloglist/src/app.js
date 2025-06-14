import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import config from './utils/config.js'
import middleware from './utils/middleware.js'
import blogsRouter from './controllers/blog.js'

const app = express()

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log(`[server]: MongoDB connection pool established`)
  })
  .catch((err) => {
    console.error(`[server]: MongoDB connection error: ${err}`)
  })

app.use(express.json())

morgan.token('body', (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
