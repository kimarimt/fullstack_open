import { useState, useEffect } from 'react'
import countryService from './services/country'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await countryService.getCountries()
      setCountries(countriesData)
    }

    fetchCountries()
  }, [])

  const matches = countries && search
    ? countries.filter(country => 
      String(country.name.common).toLowerCase().includes(search.toLowerCase())
    )
    : []

  return (
    <>
      {countries &&
        <>
          <div>
            <label htmlFor='search'>find countries</label>
            <input
              id='search'
              name='search'
              onChange={({ target }) => setSearch(target.value)}
              type='text'
              value={search}
            />
          </div>
          <div>
            {matches.length > 10 &&
              <p>Too many matches, specify another filter</p>
            }
            {selected && 
              <>
                <Country country={selected} />
                <br />
                <button onClick={() => setSelected(null)}>
                  Back
                </button>
              </>
            }
            {matches.length > 1 && matches.length <= 10 && !selected && (
              matches.map(country => 
                <p key={country.cca2}>
                  {country.name.common}{' '}
                  <button onClick={() => setSelected(country)}>
                    Show
                  </button>
                </p>
              )
            )}
            {matches.length == 1 &&
              <Country country={matches[0]} />
            }
          </div>
        </>
      }
    </>
  )
}

export default App