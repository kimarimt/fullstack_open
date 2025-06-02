import { useEffect, useState } from 'react'
import contactsService from './services/contacts'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [search, setSearch] = useState('')
  const [contacts, setContacts] = useState(null)

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
      alert(`${name} is already in your contacts`)
      return false
    }

    const newContact = {
      id: String(contacts.length + 1),
      name,
      phoneNumber
    }

    const savedContact = await contactsService.saveContact(newContact)
    setContacts(contacts.concat(savedContact))
    return true
  }

  return (
    <>
      {contacts && (
        <>
          <h1>Phonebook</h1>
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
          />
        </>
      )}
    </>
  )
}

export default App