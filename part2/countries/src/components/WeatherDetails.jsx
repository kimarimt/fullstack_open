import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

export default function WeatherDetails({ capital }) {
  const [weather, setWeather] = useState(null)

  useEffect(function() {
    async function fetchWeatherData() {
      const weatherData = await weatherService.getWeatherData(capital)
      setWeather(weatherData)
    }

    fetchWeatherData()
  }, [capital])

  console.log(weather)

  return (
    <>
      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <img 
            src={weather.current.condition.icon} 
            alt={weather.current.condition.text} 
          />
          <p>Wind: {(weather.current.wind_mph / 2.237).toFixed(1)} m/s</p>
        </div>
      )}
    </>
  )
}