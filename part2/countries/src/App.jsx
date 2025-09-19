import { useEffect, useState } from 'react'
import countryService from './services/country'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await countryService.getCountries()
      setCountries(countriesData)
    }

    fetchCountries()
  }, [])

  const matches = countries 
    ? countries.filter(country => country.name.common.includes(searchQuery))
    : null

  return (
    <>
      { matches && (
        <div>
          <div>
            <label htmlFor='search'>find countries </label>
            <input 
              type='text' 
              id='search' 
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
            />
          </div>
          <>
            {!selectedCountry && (
              <div>
                { matches.length > 10 && <p>Too many matches, specify another filter</p>}
                { matches.length > 1 && matches.length <= 10 && matches.map(country => 
                  <p key={country.cca2}>
                    {country.name.common}
                    <button onClick={() => setSelectedCountry(country)}>Show</button>
                  </p>
                )}
                {matches.length === 1 && <CountryDetails country={matches[0]} />}
              </div>
            )}
            {selectedCountry && (
              <>
                <CountryDetails country={selectedCountry} />
                <button onClick={() => setSelectedCountry(null)}>Back</button>
              </>
            )}
          </>
        </div>
      )}
    </>
  )
}

export default App