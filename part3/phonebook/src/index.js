import express from 'express'

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

const app = express()

app.get('/info', function (req, res) {
  res.send(`Phonebook has ${contacts.length} contacts\n${new Date()}`)
})

app.get('/api/contacts', function (req, res) {
  res.json(contacts)
})

app.get('/api/contacts/:id', function (req, res) {
  const id = req.params.id
  const contact = contacts.find(c => c.id === id) 

  if (!contact) {
    return res.status(404).send(`Contact with id '${id}' not found`)
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