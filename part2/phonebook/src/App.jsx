import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas' }
  ])
  const [name, setName] = useState('')

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          <label>Name: </label>
          <input 
            id='name'
            name='name'
            type='text'
          />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contacts.map((contact) => 
        <p key={contact.name}>{contact.name}</p>
      )}
    </>
  )
}

export default App
