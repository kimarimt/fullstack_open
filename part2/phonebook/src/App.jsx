import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const [contacts, setContacts] = useState(null)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState(null)

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
      await editContact(existingContact, phoneNumber)
      return
    }

    const newContact = {
      id: String(generateId(contacts.length + 1, 6000)),
      name,
      phoneNumber
    }

    const savedContact = await contactService.addContact(newContact)
    setContacts(contacts.concat(savedContact))
    toggleNotification(`Added ${savedContact.name}`)
  }

  const editContact = async (contact, phoneNumber) => {
    if (window.confirm(`${contact.name} is already in your contacts, would like to replace the existing number with a new number?`)) {
      const newContact = {
        ...contact,
        phoneNumber
      }

      const updatedContact = await contactService.editContact(contact.id, newContact)
      setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c))
      toggleNotification(`Updated number for ${updatedContact.name}`)
    }
  }

  const deleteContact = async contact => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      await contactService.deleteContact(contact.id)
      setContacts(contacts.filter(c => c.id !== contact.id))
    }
  }

  const toggleNotification = (message, color='green') => {
    setMessage(message)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
      setColor(null)
    }, 3000)
  }

  return (
    <>
      {contacts && (
        <div>
          <h1>Phonebook</h1>
          {message && color && 
            <Notification message={message} color={color} />
          }
          <Filter 
            search={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <h2>New Contact</h2>
          <ContactForm addContact={addContact} />
          <h2>Numbers</h2>
          <Contacts 
            contacts={searchResults} 
            onDelete={deleteContact}
          />
        </div>
      )}
    </>
  )
}

export default App