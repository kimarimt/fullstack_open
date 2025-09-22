import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import Person from './models/person.js'

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

app.get('/info', (req, res) => {
  const current = new Date().toString()
  res.send(`Phonebook has info for ${persons.length} people\n${current}`)
})

app.post(baseUrl, (req, res) => {
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

  const person = persons.find(person => person.name === name)
  if (person) {
    return res.status(400).send({
      error: 'name must be unique'
    })   
  }
  
  const newPerson = {
    id: String(Math.floor(Math.random() * (10000 - 100)) + 100),
    name,
    number
  }

  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

app.get(baseUrl, async (req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

app.get(baseUrlId, (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)

  if (!person) {
    return res.status(404).json({
      error: 'person not found'
    })
  }

  res.json(person)
})

app.delete(baseUrlId, (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)

  if (!person) {
    return res.status(404).json({
      error: 'person not found'
    })
  }

  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`[server] running on port ${port}`)
})
