import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', phoneNumber: '305-204-3201' },
    { id: 2, name: 'Ada Lovelace', phoneNumber: '305-200-7808' },
    { id: 3, name: 'Dan Abramov', phoneNumber: '762-900-9760' },
    { id: 4, name: 'Mary Poppendieck', phoneNumber: '305-863-3750' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleTermChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handlePhoneNumberChange = event => {
    setPhoneNumber(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    const contactExists = contacts.find(contact => contact.name === name)
    if (contactExists) {
      alert(`${contactExists.name} already exists in your contacts`)
    } else {
      const newContact = { name, phoneNumber }
      setContacts([...contacts, newContact])
      setName('')
      setPhoneNumber('')
    }
  }

  const filteredContacts = searchTerm
    ? contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : contacts

  return (
    <>
      <h1>Phonebook</h1>
      <div>
        <label>Search Contacts: </label>
        <input 
          type='text'
          value={searchTerm}
          onChange={handleTermChange}
        />
      </div>
      <div>
        <h2>New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name: </label>
            <input 
              id='name'
              name='name'
              type='text'
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor='phoneNumber'>Number: </label>
            <input 
              id='phoneNumber' 
              name='phoneNumber' 
              type='text'
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div>
            <button type='submit'>
              Add
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2>Contacts</h2>
        {filteredContacts.map((contact) => 
          <p key={contact.id}>{contact.name} {contact.phoneNumber}</p>
        )}
      </div>
    </>
  )
}

export default App
