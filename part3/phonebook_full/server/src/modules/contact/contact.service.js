import Contact from './contact.schema.js'

let mockContacts = [
  {
    id: '1',
    name: 'Arto Hellas',
    phoneNumber: '543-908-5476'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    phoneNumber: '723-465-8734'
  },
  {
    id: '3',
    name: 'Dan Abramov',
    phoneNumber: '903-234-4331'
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    phoneNumber: '736-908-7857'
  },
]

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

const removeContact = (contactId) => {
  const existingContact = findContactById(contactId)
  if (!existingContact) {
    return false;
  }

  mockContacts = mockContacts.filter(contact => contact.id !== contactId)
  return true;
}

export default {
  addNewContact,
  findAllContacts,
  findContactByName,
  findContactById,
  removeContact,
}