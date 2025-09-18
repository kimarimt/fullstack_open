import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1-555-728-5177', id: 1 },
    { name: 'Ada Lovelace', number: '1-555-834-4065', id: 2 },
    { name: 'Dan Abramov', number: '1-555-744-9406', id: 3 },
    { name: 'Mary Poppendieck', number: '1-555-564-3101', id: 4 }

  ])
  
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredContacts = persons.filter(p => p.name.includes(filter))

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.find(p => p.name === name)) {
      alert(`${name} already exists in your contacts`)
      return
    }

    setPersons(persons.concat({ name, number }))
    setName('')
    setNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor='search'>Search Contacts: </label>
        <input 
          id='search'
          type='text'
          value={filter}
          onChange={({ target }) => setFilter(target.value)} 
        />
      </div>
      <h2>Add Contact</h2>
      <form onSubmit={addPerson}>
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
          <label htmlFor='number'>Number: </label>
          <input 
            id='number'
            type='text'
            value={number}
            onChange={({ target }) => setNumber(target.value)}
          />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredContacts.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App