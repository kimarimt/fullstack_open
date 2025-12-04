import { useEffect, useState } from 'react'
import CountryDetails from './components/CountryDetails'
import countryService from './services/country'

const App = () => {
  const [countries, setCountres] = useState(null)
  const [search, setSearch] = useState('')

  const searchResults = countries
    ? countries.filter(country => country.name.common.includes(search))
    : null

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await countryService.getCountries()
      setCountres(countriesData)
    }

    fetchCountries()
  }, [])

  return (
    <>
      {searchResults && (
        <div>
          <div>
            <label htmlFor='search'>Search countries: </label>
            <input 
              id='search'
              type='text'
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
          </div>
          <div>
            {searchResults.length > 10 && 
              <p>Too many matches, specify another filter</p> 
            }
            {searchResults.length > 1 && searchResults.length <= 10 && (searchResults.map(country => 
              <p key={country.cca2}>{country.name.common}</p>
            ))}
            {searchResults.length === 1 && <CountryDetails country={searchResults[0]} />}
          </div>
        </div>
      )}
    </>
  )
}

export default App