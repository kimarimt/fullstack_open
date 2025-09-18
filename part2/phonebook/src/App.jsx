import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [name, setName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name }))
    setName('')
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
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>
          <span>{person.name}</span>
        </div>
      ))}
    </div>
  )
}

export default App