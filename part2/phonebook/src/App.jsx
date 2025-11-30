import { useState } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', phoneNumber: '505-396-2710' },
    { id: 2, name: 'Ada Lovelace', phoneNumber: '505-644-4860' },
    { id: 3, name: 'Dan Abramov', phoneNumber: '472-241-5581' },
    { id: 4, name: 'Mary Poppendieck', phoneNumber: '774-898-7840' },
  ])
 
  const [search, setSearch] = useState('')
  const searchResults = contacts.filter(contact => contact.name.includes(search))

  const addContact = (name, phoneNumber) => {
    const existingContact = contacts.find(contact => contact.name === name)
    if (existingContact) {
      alert(`${existingContact.name} is already in your contacts`)
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
    <div>
      <h1>Phonebook</h1>
      <Filter 
        search={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <h2>New Contact</h2>
      <ContactForm addContact={addContact} />
      <h2>Numbers</h2>
      <Contacts contacts={searchResults} />
    </div>
  )
}

export default App