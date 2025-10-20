import { useState } from 'react'
import Filter from './components/Filter'
import NewContactForm from './components/NewContactForm'
import Contacts from './components/Contacts'

export default function App() {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', phoneNumber: '1-978-754-6980' },
    { name: 'Ada Lovelace', phoneNumber: '1-256-733-2241' },
    { name: 'Dan Abramov', phoneNumber: '1-564-869-6404' },
    { name: 'Mary Poppendieck', phoneNumber: '1-305-277-6659' }
  ])
  
  const [search, setSearch] = useState('')
  const matches = contacts.filter(contact => contact.name.includes(search))

  function addContact({ name, phoneNumber }) {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in your contacts`)
      return false
    }

    setContacts(contacts.concat({ name, phoneNumber }))
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
      <NewContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Contacts contacts={matches} />
    </div>
  )
}