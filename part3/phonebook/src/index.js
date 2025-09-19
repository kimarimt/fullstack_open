import express from 'express'

const persons = [
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
const port = 3001

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.listen(port, () => {
  console.log(`[server] running on port ${port}`)
})
