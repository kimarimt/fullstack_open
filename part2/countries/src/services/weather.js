import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = 'http://api.weatherapi.com/v1/current.json'

const getWeather = async capital => {
  const params = {
    q: capital,
    key: apiKey
  }

  const response = await axios.get(baseUrl, { params })
  return response.data
}

export default {
  getWeather
}