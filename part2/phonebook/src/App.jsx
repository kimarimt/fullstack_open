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

  const addPerson = async ({ name, number }) => {    
    if (persons.find(p => p.name === name)) {
      alert(`${name} already exists in your contacts`)
      return false
    }

    const personObj = {
      id: String(persons.length + 1),
      name,
      number
    }

    const savedPerson = await personService.addPerson(personObj)
    setPersons(persons.concat(savedPerson))
    return true
  }

  const deletePerson = async (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}`)) {
      await personService.deletePerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
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
      {filteredContacts && 
        <Persons 
          persons={filteredContacts} 
          onClick={deletePerson}
        />
      }
    </div>
  )
}

export default App