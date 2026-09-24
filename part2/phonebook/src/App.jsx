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

  const handleFormSubmit = (name, phoneNumber) => {
    const contactExists = contacts.find(contact => contact.name === name) 
    if (contactExists) {
      alert(`${contactExists.name} already exists in your contacts`)
      return false
    } 

    const newContact = {
      id: contacts.length + 1,
      name,
      phoneNumber
    }

    setContacts([...contacts, newContact])
    return true    
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
          />
        </>
      )}
    </>
  )
}

export default App
