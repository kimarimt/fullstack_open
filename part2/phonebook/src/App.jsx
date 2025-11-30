import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', phoneNumber: '505-396-2710' }
  ])
 
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

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
      {contacts.map(contact => 
        <p key={contact.name}>{contact.name} {contact.phoneNumber}</p>
      )}
    </div>
  )
}

export default App