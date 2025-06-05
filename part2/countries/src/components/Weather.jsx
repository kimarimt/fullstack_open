import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const currentWeather = await weatherService.getCurrentWeather(capital)
      setWeatherData(currentWeather)
    }

    fetchCurrentWeather()
  }, [capital])


  return ( weatherData &&
    <>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <img 
        src={weatherData.current.condition.icon} 
        alt={weatherData.current.condition.text}
      />
      <p>Wind: {(weatherData.current.wind_mph / 2.237).toFixed(2)} m/s</p>
    </>
  )
}

export default Weather