import { useState } from 'react'

export default function App() {
  const [contacts, setContects] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  function addContact(event) {
    event.preventDefault()
    setContects(contacts.concat({ name: newName }))
    setNewName('')
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
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      {contacts.map(contact => 
        <p key={contact.name}>{contact.name}</p>
      )}
    </div>
  )
}