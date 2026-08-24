import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas' }
  ])
  const [name, setName] = useState('')

  function handleChange(event) {
    setName(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setContacts([...contacts, { name }])
    setName('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            id='name'
            name='name'
            type='text'
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>
            Add
          </button>
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
