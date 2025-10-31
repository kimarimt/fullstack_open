import express from 'express'
import morgan from 'morgan'
import { generateId } from './util/helpers.js'

let contacts = [
  {
    id: '1',
    name: 'Ada Lovelace',
    phoneNumber: '472-252-7200'
  },
  {
    id: '2',
    name: 'Dan Abramov',
    phoneNumber: '305-202-7887'
  },
  {
    id: '3',
    name: 'Mary Poppendieck',
    phoneNumber: '505-676-1598'
  },
  {
    id: '4',
    name: 'Arto Hellas',
    phoneNumber: '983-378-9208'
  }
]

morgan.token('body', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', function (req, res) {
  res.send(`Phonebook has ${contacts.length} contacts\n${new Date()}`)
})

app.post('/api/contacts', function (req, res) {
  const { name, phoneNumber } = req.body

  if (!name) {
    return res.status(400).send({ error: 'name is required' })
  }

  if (!phoneNumber) {
    return res.status(400).send({ error: 'phoneNumber is required' })
  }

  const contact = contacts.find(c => c.name === name)
  if (contact) {
    return res.status(400).send({ error: 'name must be unique' })
  }

  const newContact = {
    id: String(generateId(contacts.length, 10000)),
    name,
    phoneNumber
  }

  contacts = contacts.concat(newContact)
  res.status(201).json(newContact)
})

app.get('/api/contacts', function (req, res) {
  res.json(contacts)
})

app.get('/api/contacts/:id', function (req, res) {
  const id = req.params.id
  const contact = contacts.find(c => c.id === id) 

  if (!contact) {
    return res.status(404).send({ error: `Contact with id '${id}' not found` })
  }

  return res.json(contact)
})

app.delete('/api/contacts/:id', function (req, res) {
  const id = req.params.id
  contacts = contacts.filter(c => c.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, function () {
  console.log(`⚡[server] Listening at http://localhost:${PORT}`)
})