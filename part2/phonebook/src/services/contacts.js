import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'

const addContact = async newContact => {
  const response = await axios.post(baseUrl, newContact)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteContact = async contactId => {
  const response = await axios.delete(`${baseUrl}/${contactId}`)
  return response.data
}

export default {
  addContact,
  getAll,
  deleteContact
}