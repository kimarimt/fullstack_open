import axios from 'axios'

const countryApi = 'https://studies.cs.helsinki.fi/restcountries/'

const getCountries = async () => {
  const response = await axios.get(`${countryApi}/api/all`)
  return response.data
}

export default {
  getCountries
}