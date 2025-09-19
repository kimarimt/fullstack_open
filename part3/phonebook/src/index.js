import express from 'express'

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '1-248-344-1933'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '1-555-834-4065'
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '1-555-744-9406'
  },
  { 
    id: '4',
    name: 'Mary Poppendieck', 
    number: '1-248-444-5999'
  }
]

const app = express()
const baseUrl = '/api/persons'
const port = 3001

app.get('/info', (req, res) => {
  const current = new Date().toString()
  res.send(`Phonebook has info for ${persons.length} people\n${current}`)
})

app.get(baseUrl, (req, res) => {
  res.json(persons)
})

app.get(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)

  if (!person) {
    return res.status(404).json({
      error: 'person not found'
    })
  }

  res.json(person)
})

app.delete(`${baseUrl}/:id`, (req, res) => {
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
