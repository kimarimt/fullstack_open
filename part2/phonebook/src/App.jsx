import { useState } from "react"

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas' }
  ])
  const [name, setName] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          <label htmlFor='name'>Name: </label>
          <input 
            id='name'
            type='text' 
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  )
}

export default App