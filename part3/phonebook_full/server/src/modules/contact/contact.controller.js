import contactService from './contact.service.js'

const getInfo = (req, res) => {
  const contacts = contactService.findAllContacts()
  const currentDate = new Date().toString()
  const contactsInfo = `<p>Phonebook currently has ${contacts.length} contacts</p><p>${currentDate}</p>`
  return res.status(200).send(contactsInfo)
}

const createContact = (req, res) => {
  const { name, phoneNumber } = req.body
  if (!name || !phoneNumber) {
    return res.status(400).json({ error: 'contact name and phoneNumber are required' })
  }

  const duplicateContact = contactService.findContactByName(name)
  if (duplicateContact) {
    return res.status(400).json({ error: `${name} is already in your contacts` })
  }

  const savedContact = contactService.addNewContact(name, phoneNumber)
  return res.status(201).json(savedContact)
}

const getAllContacts = (req, res) => {
  const contacts = contactService.findAllContacts();
  return res.status(200).json(contacts)
}

const getContactById = (req, res) => {
  const contactId = req.params.id 
  const existingContact = contactService.findContactById(contactId)
  
  if (!existingContact) {
    return res.status(404).json({ error: `contact with id ${contactId} not found` })
  }

  return res.status(200).json(existingContact)
}

const deleteContact = (req, res) => {
  const contactId = req.params.id
  const success = contactService.removeContact(contactId)

  if (!success) {
    return res.status(404).json({ error: `contact with id ${contactId} not found` })
  }

  return res.status(204).send()
}

export default {
  getInfo,
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
}