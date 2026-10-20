import Contact from './contact.schema.js'
import APIError from '../../shared/exceptions/APIError.js'

const addNewContact = async (name, phoneNumber) => {
  const duplicateContact = await findContactByName(name)
  if (duplicateContact) {
    const message = `${name} is already in your contacts`
    throw new APIError(message, 400)
  }

  const newContact = new Contact({
    name,
    phoneNumber
  })

  const savedContact = await newContact.save()
  return savedContact
}

const findAllContacts = async () => {
  const contacts = await Contact.find({})
  return contacts
}

const findContactByName = async (name) => {
  const existingContact = await Contact.findOne({ name: name })
  return existingContact
}

const findContactById = async (contactId) => {
  const existingContact = await Contact.findById(contactId)
  if (!existingContact) {
    const message = `contact with id ${contactId} not found`
    throw new APIError(message, 404)
  }

  return existingContact
}

const removeContact = async (contactId) => {
  const deletedUser = await Contact.findByIdAndDelete(contactId)
  if (!deletedUser) {
    const message = `contact with id ${contactId} not found`
    throw new APIError(message, 404)
  }
}

export default {
  addNewContact,
  findAllContacts,
  findContactByName,
  findContactById,
  removeContact,
}