import axios from 'axios'

const PERSONS_API = 'http://localhost:3001/persons'

const getPersons = async () => {
  const response = await axios.get(PERSONS_API)
  return response.data
}

export default {
  getPersons
}