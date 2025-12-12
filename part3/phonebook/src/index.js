import express from 'express'

let contacts = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "phoneNumber": "206-771-0040",
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "phoneNumber": "505-646-2892",
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "phoneNumber": "305-202-6061",
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "phoneNumber": "331-955-3424",
  },
]

const app = express()

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${contacts.length} contacts</p><p>${new Date()}</p>`)
})

app.get('/api/contacts', (req, res) => {
  res.json(contacts)
})

const port = 3001
app.listen(port, () => {
  console.log(`⚡[server]: running on port ${port}`)
})