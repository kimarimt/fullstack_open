import { useState, useEffect } from 'react'
import CountryDetails from './components/CountryDetails'
import countryService from './services/country'

export default function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [selected, setSelected] = useState(null)

  const searchResults = countries 
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : null

  useEffect(function() {
    async function fetchCountries() {
      const countriesData = await countryService.getAll()
      setCountries(countriesData)
    }

    fetchCountries()
  }, [])

  return (
    <>
      {searchResults && (
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
            {selected && (
              <>
                <CountryDetails country={selected} />
                <button onClick={() => setSelected(null)}>Back</button>
              </>
            )}
            {!selected && (
              <>
                {searchResults.length === 1 && <CountryDetails country={searchResults[0]} />}
                {searchResults.length > 10 && <p>Too many results, specify another filter</p>}
                {searchResults.length <= 10 && searchResults.length > 1 && (searchResults.map(result => (
                  <p key={result.cca2}>
                    <span>{result.name.common}</span>{' '}
                    <button onClick={() => setSelected(result)}>show</button>
                  </p>
                )))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}