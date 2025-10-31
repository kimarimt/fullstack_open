import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import config from './util/config.js'
import contactRouter, { contacts } from './controllers/contact.js'

morgan.token('body', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(function() {
    console.log('⚡[server] Successfully connected to MongoDB')
  })
  .catch(function(error) {
    console.log('error connecting to MongoDB, ', error)
    process.exit(1)
  })

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use('/api/contacts', contactRouter)

app.get('/info', function (req, res) {
  res.send(`Phonebook has ${contacts.length} contacts\n${new Date()}`)
})

export default app