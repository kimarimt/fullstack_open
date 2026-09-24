import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactsList from './components/ContactsList'
import Filter from './components/Filter'
import contactService from './services/contactService'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
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
    } else {
      const newContact = {
        name,
        phoneNumber
      }

      const savedContact = await contactService.createContact(newContact)
      setContacts([...contacts, savedContact])
    } 
  }

  const handleDeleteContact = async (contact) => {
    if (window.confirm(`Are you want to delete ${contact.name} from your contacts?`)) {
      await contactService.deleteContact(contact.id)
      setContacts(contacts.filter(c => contact.id !== c.id))
    }
  }

  return (
    <>
      { contacts && (
        <>
          <h1>Phonebook</h1>
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
