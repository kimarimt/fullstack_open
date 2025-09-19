import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('black')
  
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
    const person = persons.find(p => p.name === name)
    
    if (person && window.confirm(`${person.name} already exists in your phonebook, would you update their number?`)) {
      editPerson(person, number)
      return
    }

    const personObj = {
      id: String(persons.length + 1),
      name,
      number
    }

    const savedPerson = await personService.addPerson(personObj)
    setPersons(persons.concat(savedPerson))
    toggleNotification(`Added ${savedPerson.name} to contacts`)
  }

  const editPerson = async (person, newNumber) => {
    const newPersonObj = {
      ...person,
      number: newNumber
    }

    const updatedPerson = await personService.editPerson(person.id, newPersonObj)
    setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
    toggleNotification(`Updated number for ${updatedPerson.name}`)
  }

  const deletePerson = async (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}`)) {
      await personService.deletePerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const toggleNotification = (message, color = 'green') => {
    setMessage(message)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
      setColor('black')
    }, 3000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      { message && <Notification message={message} color={color} /> }
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