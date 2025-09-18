import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1-555-728-5177', id: 1 },
    { name: 'Ada Lovelace', number: '1-555-834-4065', id: 2 },
    { name: 'Dan Abramov', number: '1-555-744-9406', id: 3 },
    { name: 'Mary Poppendieck', number: '1-555-564-3101', id: 4 }
  ])
  
  const [filter, setFilter] = useState('')
  const filteredContacts = persons.filter(p => p.name.includes(filter))

  const addPerson = ({ name, number }) => {    
    if (persons.find(p => p.name === name)) {
      alert(`${name} already exists in your contacts`)
      return false
    }

    const newContact = {
      id: persons.length + 1,
      name,
      number
    }

    setPersons(persons.concat(newContact))
    return true
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        filter={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
      <h2>Add Contact</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredContacts} />
    </div>
  )
}

export default App