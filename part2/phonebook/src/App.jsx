import { useState, Fragment } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas' }
  ])
  const [name, setName] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    
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
          <label htmlFor='name'>name: </label>
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
      <h2>Contacts</h2>
      <div>
        {contacts.map(contact => (
          <Fragment key={contact.name}>
            <span>{contact.name}</span>
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default App