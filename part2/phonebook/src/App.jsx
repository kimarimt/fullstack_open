import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', phoneNumber: '505-396-2710' },
    { id: 2, name: 'Ada Lovelace', phoneNumber: '505-644-4860' },
    { id: 3, name: 'Dan Abramov', phoneNumber: '472-241-5581' },
    { id: 4, name: 'Mary Poppendieck', phoneNumber: '774-898-7840' },
  ])
 
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  const searchResults = contacts.filter(contact => contact.name.includes(search))

  const handleSubmit = event => {
    event.preventDefault()

    const existingContact = contacts.find(contact => contact.name === name)
    if (existingContact) {
      alert(`${existingContact.name} is already in your contacts`)
      return
    }

    const newContact = {
      name,
      phoneNumber
    }

    setContacts(contacts.concat(newContact))
    setName('')
    setPhoneNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor='search'>Search contacts: </label>
        <input
          id='search'
          type='text'
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
      <h2>New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input 
            id='name'
            type='text' 
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor='phoneNumber'>Phone Number: </label>
          <input 
            id='phoneNumber'
            type='text' 
            value={phoneNumber}
            onChange={({ target }) => setPhoneNumber(target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchResults.map(contact => 
        <p key={contact.id}>{contact.name} {contact.phoneNumber}</p>
      )}
    </div>
  )
}

export default App