import axios from 'axios'

const PERSONS_API = 'http://localhost:3001/persons'

const addPerson = async (personObj) => {
  const response = await axios.post(PERSONS_API, personObj)
  return response.data
}

const getPersons = async () => {
  const response = await axios.get(PERSONS_API)
  return response.data
}

export default {
  addPerson,
  getPersons
}