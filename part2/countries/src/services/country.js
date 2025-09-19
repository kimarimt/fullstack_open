import axios from 'axios'

const COUNTRY_API = 'https://studies.cs.helsinki.fi/restcountries/'

const getCountries = async () => {
  const response = await axios.get(`${COUNTRY_API}/api/all`)
  return response.data
}

export default {
  getCountries
}