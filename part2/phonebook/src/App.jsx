import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1-314-790-8474' },
  ])

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(p => p.name == name)) {
      alert(`${name} is already added to phonebook`)
      return
    } else {
      setPersons(persons.concat({ name, number }))
      setName('')
      setNumber('')
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
          <label htmlFor='number'>Number: </label>
          <input
            type='text'
            name='number'
            id='number'
            value={number}
            onChange={({ target }) => setNumber(target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map((person) => (
          <p id={person.name}>{person.name} {person.number}</p>
        ))}
      </>
    </div>
  )
}

export default App