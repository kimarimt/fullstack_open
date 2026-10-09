import { useEffect, useState } from 'react'
import CountryDetail from './components/CountryDetail'
import countryService from './services/country'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const matches = searchTerm
    ? countries.filter(c => c.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    : countries

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await countryService.getAll()
      setCountries(countriesData)
    }
    fetchCountries()
  }, [])

  return (
    <>
      {countries && (
        <>
          <div>
            <label htmlFor='search'>Search Countries</label>{' '}
            <input 
              type='text' 
              name='search' 
              id='search'
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div>
            {selectedCountry && (
              <>
                <CountryDetail country={selectedCountry} />
                <button onClick={() => setSelectedCountry(null)}>Back</button>
              </>
            )}
            {!selectedCountry && (
              <>
                {matches.length === 0 && <p>No results found!</p>}
                {matches.length === 1 && <CountryDetail country={matches[0]} />}
                {matches.length > 1 && matches.length < 10 && (
                  matches.map(c => (
                    <p key={c.cca2}>
                      {c.name.common}{' '}
                      <button onClick={() => setSelectedCountry(c)}>Show</button>
                    </p>
                  ))
                )}
                {matches.length > 10 && <p>Too many matches, specify another filter</p>}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default App