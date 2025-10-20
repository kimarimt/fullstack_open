import { useState } from 'react'

export default function App() {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', phoneNumber: '1-978-754-6980' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      {contacts.map(contact => 
        <p key={contact.name}>{contact.name} {contact.phoneNumber}</p>
      )}
    </div>
  )
}