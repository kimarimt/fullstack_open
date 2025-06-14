import express from 'express'
import Contact from '../models/contact.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, phoneNumber } = req.body

  const newContact = Contact({
    name,
    phoneNumber,
  })

  await newContact.save()
  res.json(newContact)
})

router.get('/', async (req, res) => {
  const contacts = await Contact.find({})
  res.json(contacts)
})

router.get('/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if (!contact) {
    return res.status(404).send({ error: 'contact not found' })
  }

  res.json(contact)
})

router.put('/:id', async (req, res) => {
  const update = { phoneNumber: req.body.phoneNumber }
  const newContact = await Contact.findByIdAndUpdate(req.params.id, update, { new: true })

  if (!newContact) {
    return res.status(404).send({ error: 'contact not found' })
  }

  res.json(newContact)
})

router.delete('/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  await contact.deleteOne()
  res.status(204).end()
})

export default router
