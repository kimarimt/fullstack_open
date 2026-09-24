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
      const contactsData = await contactService.getAll()
      setContacts(contactsData)
    }

    fetchContacts()
  }, [])

  const handleTermChange = (newTerm) => {
    setSearchTerm(newTerm)
  }

  const handleFormSubmit = async (name, phoneNumber) => {
    const contactExists = contacts.find(contact => contact.name === name) 
    if (contactExists) {
      alert(`${contactExists.name} already exists in your contacts`)
      return false
    } 

    const newContact = {
      name,
      phoneNumber
    }

    const savedContact = await contactService.create(newContact)
    setContacts([...contacts, savedContact])
    return true    
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
