import { useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', phoneNumber: '1-201-857-6948' },
    { id: 2, name: 'Ada Lovelace', phoneNumber: '1-201-787-4300' },
    { id: 3, name: 'Dan Abramov', phoneNumber: '1-201-601-8571' },
    { id: 4, name: 'Mary Poppendieck', phoneNumber: '1-201-871-3754' },
  ])

  const matches = contacts.filter(
    contact => contact.name.includes(search)
  )

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
      name,
      phoneNumber
    }

    setContacts(contacts.concat(newContact))
    setName('')
    setPhoneNumber('')
  }

  return (
    <>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor='search'>Search Contacts: </label>
        <input
          id='search'
          name='search'
          onChange={({ target }) => setSearch(target.value)}
          type='text'
          value={search}
        />
      </div>
      <div>
        <h2>Add a new</h2>
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
            <label htmlFor='phone'>phone: </label>
            <input
              id='phone'
              name='phone'
              onChange={({ target }) => setPhoneNumber(target.value)}
              type='phone'
              value={phoneNumber}
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
          matches.map(contact =>
            <p key={contact.id}>
              {contact.name} {contact.phoneNumber}
            </p>
          )
        }
      </div>
    </>
  )
}

export default App