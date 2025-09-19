import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const [ captial ] = country.capital
      const weatherData = await weatherService.getWeatherData(captial)
      setWeatherData(weatherData)
    }

    fetchWeatherData()
  }, [country])

  console.log(weatherData)
 
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      { weatherData && (
        <>
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <img 
            src={weatherData.current.condition.icon} 
            alt={weatherData.current.condition.text} 
          />
          <p>Wind: {(weatherData.current.wind_mph / 2.237).toFixed(1)} m/s</p>
        </>
      )}
    </div>
  )
}

export default CountryDetails