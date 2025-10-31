import { useState, useEffect } from 'react'
import contactService from './services/contact'
import Filter from './components/Filter'
import NewContactForm from './components/NewContactForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'

export default function App() {
  const [contacts, setContacts] = useState(null)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState(null)
  
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
    const existingContact = contacts.find(contact => contact.name === name)

    if (existingContact) {
      editContact(existingContact, phoneNumber)
      return
    }

    const newContact = {
      id: String(Math.floor(Math.random() * 1000)),
      name,
      phoneNumber
    }
    
    const savedContact = await contactService.save(newContact)
    setContacts(contacts.concat(savedContact))
    toggleNotification(`Added ${savedContact.name}`)
  }

  async function editContact(existingContact, newNumber) {
    if (confirm(`${existingContact.name} is already in your contacts. Would you like to replace the old phone number?`)) {
      const newContact = {
        ...existingContact,
        phoneNumber: newNumber
      }

      const updatedContact = await contactService.editContact(existingContact.id, newContact)
      setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact))
      toggleNotification(`${updatedContact.name}'s number updated`)
    }
  }

  async function deleteContact(contactId) {
    const existingContact = contacts.find(contact => contact.id === contactId)

    if (confirm(`Delete ${existingContact.name}`)) {
      try {
        await contactService.deleteContact(contactId)
        setContacts(contacts.filter(contact => contact.id !== contactId))
      } catch (e) {
        const message = e.response.data
        toggleNotification(`${existingContact.name} ${message}`, 'red')
      }
    }
  }

  function toggleNotification(message, color='green') {
    setMessage(message)
    setColor(color)

    setTimeout(function () {
      setMessage(null)
      setColor(null)
    }, 3000)
  }

  return ( 
    <>
      {matches && (
        <div>
          <h1>Phonebook</h1>
          {message && color && <Notification message={message} color={color} />}
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