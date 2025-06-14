import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import config from './config/config.js'
import middleware from './middleware/middleware.js'
import Contact from './models/contact.js'
import contactsRouter from './controllers/contacts.js'

const app = express()

mongoose
  .connect(config.mongoUri)
  .then((result) => {
    console.log('MongoDB connection pool established')
  })
  .catch((err) => {
    console.error('error connection to MongoDB', err)
  })

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms - :body'))

app.get('/api/info', async (req, res) => {
  const contacts = await Contact.countDocuments()
  const currentDate = new Date()

  res.send(`<p>Phonebook has info for ${contacts} people</p><p>${currentDate.toDateString()} ${currentDate.toTimeString()}</p>`)
})

app.use('/api/contacts', contactsRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

app.listen(config.port, () => {
  console.log(`[server]: Listening at http://localhost:${config.port}`)
})
