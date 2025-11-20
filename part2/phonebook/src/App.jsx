import { useState, Fragment } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '720-226-3698' },
    { name: 'Ada Lovelace', number: '276-522-8909' },
    { name: 'Dan Abramov', number: '305-250-5118' },
    { name: 'Mary Poppendieck', number: '305-689-5555' }
  ])
  
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')

  const searchResults = contacts
    .filter(contact => contact.name.includes(search))

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
      <div>
        <label htmlFor='search'>Search contacts</label>
        <input 
          id='search'
          type='text' 
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
      <h2>Add a new Contact</h2>
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
        {searchResults.map(contact => (
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