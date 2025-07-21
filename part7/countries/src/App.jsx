import { useState } from 'react'
import { useCountry, useField } from './hooks'
import Country from './components/Country'

const App = () => {
  const [name, setName] = useState('')
  const nameInput = useField('name')
  const country = useCountry(name)

  const fetchCountry = (event) => {
    event.preventDefault()
    setName(nameInput.value)
  }

  return (
    <>
      <form onSubmit={fetchCountry}>
        <label htmlFor='name'>Name: </label>
        <input {...nameInput} />
        <button type='submit'>search</button>
      </form>
      <Country country={country} />
    </>
  )
}

export default App