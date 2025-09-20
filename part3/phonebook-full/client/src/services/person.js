import axios from 'axios'

const PERSONS_API = 'http://localhost:3001/api/persons'

const addPerson = async (personObj) => {
  const response = await axios.post(PERSONS_API, personObj)
  return response.data
}

const getPersons = async () => {
  const response = await axios.get(PERSONS_API)
  return response.data
}

const editPerson = async (id, newPersonObj) => {
  const response = await axios.put(`${PERSONS_API}/${id}`, newPersonObj)
  return response.data
}

const deletePerson = async (id) => {
  await axios.delete(`${PERSONS_API}/${id}`)
}

export default {
  addPerson,
  getPersons,
  editPerson,
  deletePerson
}