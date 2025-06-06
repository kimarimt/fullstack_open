import express from 'express'

const router = express.Router()

export const contacts = [
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

router.get('/', (req, res) => {
  res.json(contacts)
})

export default router