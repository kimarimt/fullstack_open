import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', phoneNumber: '305-204-3201' }
  ])
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handlePhoneNumberChange(event) {
    setPhoneNumber(event.target.value)
  }

  function handleSubmit(event) {
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

  return (
    <>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {contacts.map((contact) => 
        <p key={contact.name}>{contact.name} {contact.phoneNumber}</p>
      )}
    </>
  )
}

export default App
