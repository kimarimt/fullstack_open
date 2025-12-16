import axios from 'axios'

const baseUrl = '/api/contacts'

const addContact = async newContact => {
  const response = await axios.post(baseUrl, newContact)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const editContact = async (contactId, newContact) => {
  const response = await axios.put(`${baseUrl}/${contactId}`, newContact)
  return response.data
}

const deleteContact = async contactId => {
  await axios.delete(`${baseUrl}/${contactId}`)
}

export default {
  addContact,
  getAll,
  editContact,
  deleteContact
}