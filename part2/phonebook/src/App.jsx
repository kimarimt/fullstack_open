import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas' }
  ])
 
  const [name, setName] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const existingContact = contacts.find(contact => contact.name === name)
    if (existingContact) {
      alert(`${existingContact.name} is already in your contacts`)
      return
    }

    const newContact = {
      name
    }

    setContacts(contacts.concat(newContact))
    setName('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
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
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contacts.map(contact => 
        <p key={contact.name}>{contact.name}</p>
      )}
    </div>
  )
}

export default App