import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactsList from './components/ContactsList'
import Filter from './components/Filter'
import NotificationAlert from './components/NotificationAlert'
import contactService from './services/contactService'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('black')
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await contactService.getAllContacts()
      setContacts(contactsData)
    }

    fetchContacts()
  }, [])

  const editContact = async (contact, newPhoneNumber) => {
    if (window.confirm(`${contact.name} already exists in your contacts. Would you like to update their number?`)) {
      const newContact = {
        ...contact,
        phoneNumber: newPhoneNumber
      }

      const updatedContact = await contactService.updateContact(contact.id, newContact)
      setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c))
    }
  }

  const handleTermChange = (newTerm) => {
    setSearchTerm(newTerm)
  }

  const handleFormSubmit = async (name, phoneNumber) => {
    const existingContact = contacts.find(contact => contact.name === name) 
    if (existingContact) {
      await editContact(existingContact, phoneNumber)
      const message = `Updated phone number for ${existingContact.name}`
      handleNotification(message)
    } else {
      const newContact = {
        name,
        phoneNumber
      }

      const savedContact = await contactService.createContact(newContact)
      setContacts([...contacts, savedContact])
      const message = `Added ${savedContact.name} to your contacts`
      handleNotification(message)
    } 
  }

  const handleDeleteContact = async (contact) => {
    if (window.confirm(`Are you want to delete ${contact.name} from your contacts?`)) {
      await contactService.deleteContact(contact.id)
      setContacts(contacts.filter(c => contact.id !== c.id))
    }
  }

  const handleNotification = (message, color = 'green') => {
    setNotificationMessage(message)
    setNotificationColor(color)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationColor('black')
    }, 2000)
  }

  return (
    <>
      { contacts && (
        <>
          <h1>Phonebook</h1>
          {notificationMessage && 
            <NotificationAlert 
              message={notificationMessage} 
              color={notificationColor} 
            /> 
          }
          <Filter onTermChange={handleTermChange} />
          <ContactForm onFormSubmit={handleFormSubmit} />
          <ContactsList 
            searchTerm={searchTerm}
            contacts={contacts}
            onContactDelete={handleDeleteContact}
          />
        </>
      )}
    </>
  )
}

export default App
