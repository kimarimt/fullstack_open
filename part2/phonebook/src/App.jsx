import { useState } from 'react'

export default function App() {
  const [contacts, setContects] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          <label htmlFor='name'>Name: </label>
          <input id='name' type='text' />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Contacts</h2>
    </div>
  )
}