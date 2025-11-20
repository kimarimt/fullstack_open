import { useState, Fragment } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '720-226-3698' }
  ])
  
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const contact = contacts.find(contact => contact.name === name)

    if (contact) {
      alert(`${contact.name} already exists in your contacts`)
      return
    }
    
    const newContact = { 
      name,
      number
    }

    setContacts(contacts.concat(newContact))
    setName('')
    setNumber('')
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
          <label htmlFor='number'>Phone Number: </label>
          <input 
            id='number' 
            type='text' 
            value={number}
            onChange={({ target }) => setNumber(target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <div>
        {contacts.map(contact => (
          <Fragment key={contact.name}>
            <span>{contact.name} {contact.number}</span>
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default App