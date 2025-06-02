import { useState } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [search, setSearch] = useState('')
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', phoneNumber: '1-201-857-6948' },
    { id: 2, name: 'Ada Lovelace', phoneNumber: '1-201-787-4300' },
    { id: 3, name: 'Dan Abramov', phoneNumber: '1-201-601-8571' },
    { id: 4, name: 'Mary Poppendieck', phoneNumber: '1-201-871-3754' },
  ])

  const matches = contacts.filter(
    contact => contact.name.includes(search)
  )

  const addContact = (name, phoneNumber) => {
    const contactExists = contacts.find(contact =>
      contact.name === name
    )

    if (contactExists) {
      alert(`${name} is already in your contacts`)
      return false
    }

    const newContact = {
      id: contacts.length + 1,
      name,
      phoneNumber
    }

    setContacts(contacts.concat(newContact))
    return true
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter
        search={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <h2>Add a new</h2>
      <ContactForm
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Contacts
        contacts={matches}
      />
    </>
  )
}

export default App