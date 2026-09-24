import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'

const createContact = async (newContact) => {
  const response = await axios.post(baseUrl, newContact)
  return response.data
}

const getAllContacts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteContact = async (contactId) => {
  await axios.delete(`${baseUrl}/${contactId}`)
}

export default {
  createContact,
  getAllContacts,
  deleteContact
}