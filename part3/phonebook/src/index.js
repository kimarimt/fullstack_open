import express from 'express'

const contacts = [
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

const PORT = 3001
app.listen(PORT, function () {
  console.log(`⚡[server] Listening at http://localhost:${PORT}`)
})