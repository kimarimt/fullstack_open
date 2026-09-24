import { useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactsList from './components/ContactsList'
import Filter from './components/Filter'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', phoneNumber: '305-204-3201' },
    { id: 2, name: 'Ada Lovelace', phoneNumber: '305-200-7808' },
    { id: 3, name: 'Dan Abramov', phoneNumber: '762-900-9760' },
    { id: 4, name: 'Mary Poppendieck', phoneNumber: '305-863-3750' },
  ])

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
      <h1>Phonebook</h1>
      <Filter onTermChange={handleTermChange} />
      <ContactForm onFormSubmit={handleFormSubmit} />
      <ContactsList 
        searchTerm={searchTerm}
        contacts={contacts}
      />
    </>
  )
}

export default App
