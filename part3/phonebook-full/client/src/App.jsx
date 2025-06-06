import { useEffect, useState } from 'react'
import contactsService from './services/contacts'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'

const App = () => {
  const [search, setSearch] = useState('')
  const [contacts, setContacts] = useState(null)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('black')

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await contactsService.getContacts()
      setContacts(contactsData)
    }

    fetchContacts()
  }, [])

  const matches = contacts
    ? contacts.filter(contact => contact.name.includes(search))
    : []

  const addContact = async (name, phoneNumber) => {
    const contactExists = contacts.find(contact =>
      contact.name === name
    )

    if (contactExists) {
      editContact(contactExists, phoneNumber)
      return
    }

    const id = Math.floor(Math.random() * 9999) + 1

    const newContact = {
      id: String(id),
      name,
      phoneNumber
    }

    const savedContact = await contactsService.saveContact(newContact)
    setContacts(contacts.concat(savedContact))
    toggleNotification(`${savedContact.name} saved to contacts`, 'green')
  }

  const editContact = async (contact, newNumber) => {
    if (window.confirm(`${contact.name} is already in your contacts, would you like to update the number`)) {
      const updatedContact = {
        ...contact,
        phoneNumber: newNumber
      }

      const newContact = await contactsService.editContact(updatedContact.id, updatedContact)
      setContacts(contacts.map(contact => contact.id === newContact.id ? newContact : contact))
    }
  }

  const deleteContact = async contact => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      try {
        const deletedContact = await contactsService.deleteContact(contact.id)
        setContacts(
          contacts.filter(contact => deletedContact.id !== contact.id)
        )
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        const message = `${contact.name} has already been deleted from your contacts`
        toggleNotification(message, 'red')
      }
    }
  }

  const toggleNotification = (message, color) => {
    setMessage(message)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
      setColor('black')
    }, 2000)
  }

  return (
    <>
      {contacts && (
        <>
          <h1>Phonebook</h1>
          {message &&
            <Notification message={message} color={color} />
          }
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
            handleDelete={deleteContact}
          />
        </>
      )}
    </>
  )
}

export default App