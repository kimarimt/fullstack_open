import Contact from './contact.schema.js'

const addNewContact = async (name, phoneNumber) => {
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
  return existingContact
}

const removeContact = async (contactId) => {
  const deletedUser = await Contact.findByIdAndDelete(contactId)
  return deletedUser !== null
}

export default {
  addNewContact,
  findAllContacts,
  findContactByName,
  findContactById,
  removeContact,
}