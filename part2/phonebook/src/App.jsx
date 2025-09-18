import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1-555-728-5177' }
  ])
  
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

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
      {persons.map(person => (
        <div key={person.name}>
          <span>{person.name} {person.number}</span>
        </div>
      ))}
    </div>
  )
}

export default App