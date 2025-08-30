import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [name, setName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.find(p => p.name == name)) {
      alert(`${name} is already added to phonebook`)
      return
    } else {
      setPersons(persons.concat({ name }))
      setName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map((person) => (
          <p id={person.name}>{person.name}</p>
        ))}
      </>
    </div>
  )
}

export default App