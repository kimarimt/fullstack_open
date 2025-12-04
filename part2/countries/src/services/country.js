import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountries = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default {
  getCountries
}