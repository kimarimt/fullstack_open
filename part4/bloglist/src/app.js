import express from 'express'
import mongoose from 'mongoose'
import config from './config/config.js'

const app = express()

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log(`[server]: MongoDB connection pool established`)
  })
  .catch((err) => {
    console.error(`[server]: MongoDB connection error: ${err}`)
  })

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>')
})

export default app
