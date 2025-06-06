import express from 'express'

const router = express.Router()

export let contacts = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "phoneNumber": "1-923-668-9296"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "phoneNumber": "638-658-9605"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "phoneNumber": "1-928-311-5358"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "phoneNumber": "335-230-3499"
  }
]

const getRandomId = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min 
}

router.post('/', (req, res) => {
  const { name, phoneNumber } = req.body
  
  if (!name || !phoneNumber) {
    return res.status(400).json({ error: 'name and phone number fields are required' })
  }

  const contact = contacts.find(contact => contact.name === name) 

  if (contact) {
    return res.status(400).json({ error: `${name} is already in your contacts` })
  }
  
  const id = String(getRandomId(1, 1000))

  const newContact = {
    id,
    name,
    phoneNumber
  }

  contacts = contacts.concat(newContact)
  res.json(newContact)
})

router.get('/', (req, res) => {
  res.json(contacts)
})

router.get('/:id', (req, res) => {
  const contact = contacts.find(contact => contact.id === req.params.id)

  if (!contact) {
    return res
      .status(404)
      .json({ error: 'contact not found' })
  }

  res.json(contact)
})

router.delete('/:id', (req, res) => {
  const contact = contacts.find(contact => contact.id === req.params.id)

  if (!contact) {
    return res
      .status(404)
      .json({ error: 'contact not found' })
  }

  contacts = contacts.filter(c => c.id !== contact.id)
  res.status(204).end()
})

export default router