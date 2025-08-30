import { useState } from 'react'
import SearchBar from './components/SearchBar'
import NewContactForm from './components/NewContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')

  const addPerson = ({ name, number }) => {
    if (persons.find(p => p.name == name)) {
      alert(`${name} is already added to phonebook`)
      return false
    } else {
      setPersons(persons.concat({ name, number }))
      return true
    }
  }

  const searchResults = persons.filter(p => p.name.includes(search))

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchBar
        search={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <NewContactForm addPerson={addPerson} />
      <Contacts searchResults={searchResults} />
    </div>
  )
}

export default App