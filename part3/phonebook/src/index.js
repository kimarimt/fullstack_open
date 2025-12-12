import express from 'express'

let contacts = [
  {
    'id': '1',
    'name': 'Arto Hellas',
    'phoneNumber': '206-771-0040',
  },
  {
    'id': '2',
    'name': 'Ada Lovelace',
    'phoneNumber': '505-646-2892',
  },
  {
    'id': '3',
    'name': 'Dan Abramov',
    'phoneNumber': '305-202-6061',
  },
  {
    'id': '4',
    'name': 'Mary Poppendieck',
    'phoneNumber': '331-955-3424',
  },
]

const baseUrl = '/api/contacts'
const app = express()

const generateId = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

app.use(express.json())

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${contacts.length} contacts</p><p>${new Date()}</p>`)
})

app.post(baseUrl, (req, res) => {
  const { name, phoneNumber } = req.body
  if (!name || !phoneNumber) {
    return res.status(400).json({ error: 'name and phone number are required' })
  }

  const contact = contacts.find(c => c.name === name)
  if (contact) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newContact = {
    id: String(generateId(contacts.length, 10000)),
    name,
    phoneNumber
  }

  contacts = contacts.concat(newContact)
  res.json(newContact)
})

app.get(baseUrl, (req, res) => {
  res.json(contacts)
})

app.get(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id
  const contact = contacts.find(c => c.id === id)

  if (!contact) {
    return res.status(404).end()
  }

  res.json(contact)
})

app.delete(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id
  const contact = contacts.find(c => c.id === id)

  if (!contact) {
    return res.status(404).end()
  }

  contacts = contacts.filter(c => c.id !== contact.id)
  res.status(204).end()
})

const port = 3001
app.listen(port, () => {
  console.log(`⚡[server]: running on port ${port}`)
})