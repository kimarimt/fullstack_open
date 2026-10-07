import axios from 'axios'

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = async () => {
  const response = await axios.get(countriesUrl)
  return response.data
}

export default {
  getAll
}