import axios from 'axios'

const baseUrl = 'http://api.weatherapi.com/v1/current.json'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getCurrentWeather = async capital => {
  const res = await axios.get(`${baseUrl}?key=${apiKey}&q=${capital}`)
  return res.data
}

export default {
  getCurrentWeather
}