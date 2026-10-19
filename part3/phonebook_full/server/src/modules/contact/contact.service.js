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

const addNewContact = (name, phoneNumber) => {
  const contactId = Math.floor(Math.random() * (30000 - 1 + 1) + 1)
  const newContact = {
    id: String(contactId),
    name,
    phoneNumber
  }

  mockContacts = [...mockContacts, newContact]
  return newContact
}

const findAllContacts = () => {
  return mockContacts;
}

const findContactByName = (name) => {
  return mockContacts.find(contact => contact.name === name)
}

const findContactById = (contactId) => {
  return mockContacts.find(contact => contact.id === contactId)
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