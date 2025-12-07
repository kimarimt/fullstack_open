import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await weatherService.getWeather(country.capital[0])
      setWeather(weatherData)
    }

    fetchWeather()
  }, [country])

  console.log(weather)

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather && (
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
          <p>Wind: {(weather.current.wind_mph / 2.237).toFixed(2)} m/s</p>
        </>
      )}
    </>
  )
}

export default CountryDetails