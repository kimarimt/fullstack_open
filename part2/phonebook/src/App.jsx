import { useState } from 'react'

export default function App() {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', phoneNumber: '1-978-754-6980' },
    { name: 'Ada Lovelace', phoneNumber: '1-256-733-2241' },
    { name: 'Dan Abramov', phoneNumber: '1-564-869-6404' },
    { name: 'Mary Poppendieck', phoneNumber: '1-305-277-6659' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const matches = contacts.filter(contact => contact.name.includes(search))

  function addContact(event) {
    event.preventDefault()

    if (contacts.find(contact => contact.name === newName)) {
      alert(`${newName} is already in your contacts`)
      return
    }

    setContacts(contacts.concat({ name: newName, phoneNumber: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor='search'>Search Contacts: </label>
        <input 
          id='search'
          type='text' 
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
      <h2>New Contact</h2>
      <form onSubmit={addContact}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input 
            id='name' 
            type='text'
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
          />
        </div>
        <div>
          <label htmlFor='phoneNumber'>Phone Number: </label>
          <input 
            id='phoneNumber'
            type='text' 
            value={newNumber}
            onChange={({ target }) => setNewNumber(target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      {matches.map(contact => 
        <p key={contact.name}>{contact.name} {contact.phoneNumber}</p>
      )}
    </div>
  )
}