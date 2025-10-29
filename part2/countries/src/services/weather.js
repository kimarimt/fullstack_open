import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = 'http://api.weatherapi.com/v1/current.json'

async function getWeatherData(capital) {
  const config = {
    params: {
      key: apiKey,
      q: capital
    }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

export default {
  getWeatherData
}