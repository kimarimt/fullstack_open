import express from 'express'
import Contact from '../models/contact.js'

export let contacts = [
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

const router = express.Router()

router.post('/', function (req, res) {
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

router.get('/', async function (req, res) {
  const contacts = await Contact.find({})
  res.json(contacts)
})

router.get('/:id', function (req, res) {
  const id = req.params.id
  const contact = contacts.find(c => c.id === id) 

  if (!contact) {
    return res.status(404).send({ error: `Contact with id '${id}' not found` })
  }

  return res.json(contact)
})

router.delete('/:id', function (req, res) {
  const id = req.params.id
  contacts = contacts.filter(c => c.id !== id)
  res.status(204).end()
})

export default router