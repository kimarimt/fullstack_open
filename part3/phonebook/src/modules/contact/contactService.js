const mockContacts = [
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

const findAllContacts = () => {
  return mockContacts;
}

const findContactById = (contactId) => {
  return mockContacts.find(contact => contact.id === contactId)
}

export default {
  findAllContacts,
  findContactById
}