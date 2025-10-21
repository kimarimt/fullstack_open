import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'

async function save(newContact) {
  const response = await axios.post(baseUrl, newContact)
  return response.data
}

async function getAll() {
  const response = await axios.get(baseUrl)
  return response.data
}

async function deleteContact(contactId) {
  await axios.delete(`${baseUrl}/${contactId}`)
}

export default {
  save,
  getAll,
  deleteContact
}