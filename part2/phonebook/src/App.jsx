import { useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas' }
  ])

  const handleSubmit = event => {
    event.preventDefault()

    const contactExists = contacts.find(contact => 
      contact.name === name
    )

    if (contactExists) {
      alert(`${name} is already in your contacts`)
      return
    }

    const newContact = {
      id: contacts.length + 1,
      name
    }

    setContacts(contacts.concat(newContact))
    setName('')
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>name: </label>
            <input 
              id='name'
              name='name'
              onChange={({ target }) => setName(target.value)}
              type='text' 
              value={name}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Numbers</h2>
        {
          contacts.map(contact =>
            <p key={contact.id}>{contact.name}</p>
          )
        }
      </div>
    </>
  )
}

export default App