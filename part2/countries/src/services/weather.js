import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_KEY
const weatherApi = 'http://api.weatherapi.com/v1/current.json'

const getWeatherData = async (cityName) => {
  const params = {
    key: apiKey,
    q: cityName, 
  }

  const response = await axios.get(weatherApi, {
    params
  })
  return response.data
}

export default {
  getWeatherData
}