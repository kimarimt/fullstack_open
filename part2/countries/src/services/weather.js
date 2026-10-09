import axios from 'axios'

const baseUrl = 'https://api.weatherapi.com/v1/current.json'

const getWeather = async (capital) => {
  const endpoint = `${baseUrl}?key=${import.meta.env.VITE_API_KEY}&q=${capital}`
  const response = await axios.get(endpoint)
  return response.data
}

export default {
  getWeather
}