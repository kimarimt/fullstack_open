import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const CountryDetail = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherResponse = await weatherService.getWeather(country.capital[0])
      setWeatherData(weatherResponse)
    }
    fetchWeatherData()
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => 
          <li key={key}>{value}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weatherData && (
        <>
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temp: {weatherData.current.temp_c}°C</p>
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

export default CountryDetail