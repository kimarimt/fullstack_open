import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [name, setName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <label htmlFor='name'>Name: </label>
          <input 
            type='text' 
            name='name' 
            id='name' 
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default App