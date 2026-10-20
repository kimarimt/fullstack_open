import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import path from 'path'

import middleware from './shared/middleware/middleware.js'
import contactController from './modules/contact/contact.controller.js'
import contactRoutes from './modules/contact/contact.routes.js'

const port = process.env.PORT || 3001
const mongoUri = process.env.MONGODB_URI

const startServer = async () => {
  try {
    // Database Connection
    await mongoose.connect(mongoUri)
    console.log('[server]: Connected to MongoDB database')
    
    const app = express()
    app.use(express.json())
    app.use(express.static(path.join(import.meta.dirname, '../dist')))

    // Logger midderware
    app.use(morgan('tiny', {
      skip: (req, res) => {
        return req.method === 'POST'
      }
    }))

    morgan.token('body', (req, res) => JSON.stringify(req.body))
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
      skip: (req, res) => {
        return req.method !== 'POST'
      }
    }))

    app.get('/info', contactController.getInfo)
    app.use('/api/contacts', contactRoutes)
    app.use(middleware.errorMiddleware)

    app.listen(port, () => {
      console.log(`[server]: Running on port ${port}`)
    })
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

startServer()