import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import Person from './models/person.js'
import middleware from './util/middleware.js'

const app = express()
const baseUrl = '/api/persons'
const baseUrlId = `${baseUrl}/:id`
const port = process.env.PORT || 3001

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connection successful')
  })
  .catch(err => {
    console.log(`error connecting to MongoDB: `, err)
  })

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', async (req, res) => {
  const persons = await Person.countDocuments()
  const current = new Date().toString()
  res.send(`Phonebook has info for ${persons} people\n${current}`)
})

app.post(baseUrl, async (req, res) => {
  const { name, number } = req.body

  if (!name) {
    return res.status(400).send({
      error: 'name is required'
    })
  }

  if (!number) {
    return res.status(400).send({
      error: 'number is required'
    })    
  }
  
  const newPerson = new Person({ name, number })
  const savedPerson = await newPerson.save()
  res.status(201).json(savedPerson)
})

app.get(baseUrl, async (req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

app.get(baseUrlId, async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)

    if (!person) {
      return res.status(404).send({ error: 'person not found' })
    }

    res.json(person)
  } catch (error) {
    next(error)
  }
})

app.put(baseUrlId, async (req, res, next) => {
  try {
    const { name, number } = req.body;
    const person = await Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true })

    if (!person) {
      return res.status(404).send({ error: 'person not found' })
    }

    res.json(person)
  } catch (err) {
    next(err)
  }
})

app.delete(baseUrlId, async (req, res, next) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id)

    if (!person) {
      return res.status(404).send({ error: 'person not found' })
    }

    return res.status(204).end()
  } catch (err) {
    next(err)
  }
})

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

app.listen(port, () => {
  console.log(`[server] running on port ${port}`)
})
