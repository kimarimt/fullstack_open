import { useState, useEffect } from 'react'
import contactService from './services/contact'
import Filter from './components/Filter'
import NewContactForm from './components/NewContactForm'
import Contacts from './components/Contacts'

export default function App() {
  const [contacts, setContacts] = useState(null)
  const [search, setSearch] = useState('')
  
  const matches = contacts 
    ? contacts.filter(contact => contact.name.includes(search))
    : null

  useEffect(function () {
    async function fetchContacts() {
      const contactsData = await contactService.getAll()
      setContacts(contactsData)
    }

    fetchContacts()
  }, [])

  async function addContact({ name, phoneNumber }) {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in your contacts`)
      return false
    }

    const newContact = {
      id: String(contacts.length + 1),
      name,
      phoneNumber
    }
    
    const savedContact = await contactService.save(newContact)
    setContacts(contacts.concat(savedContact))
    return true
  }

  async function deleteContact(contactId) {
    await contactService.deleteContact(contactId)
    setContacts(contacts.filter(contact => contact.id !== contactId))
  }

  return ( 
    <>
      {matches && (
        <div>
          <h1>Phonebook</h1>
          <Filter 
            search={search} 
            onChange={({ target }) => setSearch(target.value)} 
          />
          <h2>New Contact</h2>
          <NewContactForm onSubmit={addContact} />
          <h2>Contacts</h2>
          <Contacts contacts={matches} onClick={deleteContact} />
        </div>
      )}
    </>
  )
}