import contactService from './contact.service.js'

const getInfo = async (req, res) => {
  const contacts = await contactService.findAllContacts()
  const currentDate = new Date().toString()
  const contactsInfo = `<p>Phonebook currently has ${contacts.length} contacts</p><p>${currentDate}</p>`
  return res.status(200).send(contactsInfo)
}

const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body
    const savedContact = await contactService.addNewContact(name, phoneNumber)
    return res.status(201).json(savedContact)
  } catch (err) {
    next(err)
  }
}

const getAllContacts = async (req, res) => {
  const contacts = await contactService.findAllContacts();
  return res.status(200).json(contacts)
}

const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.id 
    const existingContact = await contactService.findContactById(contactId)
    return res.status(200).json(existingContact)
  } catch (err) {
    next(err)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id
    await contactService.removeContact(contactId)
    return res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export default {
  getInfo,
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
}