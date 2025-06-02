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

  const matches = contacts.filter(
    contact => contact.name.includes(search)
  )

  const addContact = (name, phoneNumber) => {
    const contactExists = contacts.find(contact =>
      contact.name === name
    )

    if (contactExists) {
      alert(`${name} is already in your contacts`)
      return false
    }

    const newContact = {
      id: contacts.length + 1,
      name,
      phoneNumber
    }

    setContacts(contacts.concat(newContact))
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