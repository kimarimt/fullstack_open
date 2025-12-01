import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'

const App = () => {
  const [contacts, setContacts] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await contactService.getAll()
      setContacts(contactsData)
    }

    fetchContacts()
  }, [])
  
  const searchResults = contacts 
    ? contacts.filter(contact => contact.name.includes(search))
    : []

  const generateId = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const addContact = async (name, phoneNumber) => {
    const existingContact = contacts.find(contact => contact.name === name)
    if (existingContact) {
      alert(`${existingContact.name} is already in your contacts`)
      return false
    }

    const newContact = {
      id: generateId(contacts.length + 1, 6000),
      name,
      phoneNumber
    }

    const savedContact = await contactService.addContact(newContact)
    setContacts(contacts.concat(savedContact))
    return true
  }

  return (
    <>
      {contacts && (
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
      )}
    </>
  )
}

export default App