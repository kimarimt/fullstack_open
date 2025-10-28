import { useState } from 'react'

export default function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)

  return (
    <div>
      <div>
        <label htmlFor='search'>Search countries</label>{' '}
        <input 
          id='search'
          type='text'
          value={search}
          onChange={({ target }) => setSearch(target.value)} 
        />
      </div>
      <div>
        <p>{search}</p>
      </div>
    </div>
  )
}