import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [filter, setFilter] = useState('')
  const filteredContacts = persons 
    ? persons.filter(p => p.name.includes(filter))
    : null

  useEffect(() => {
    const fetchPersons = async () => {
      const persons = await personService.getPersons()
      setPersons(persons)
    }

    fetchPersons()
  }, [])

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
      {filteredContacts && <Persons persons={filteredContacts} />}
    </div>
  )
}

export default App