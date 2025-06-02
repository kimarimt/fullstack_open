import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'

const saveContact = async newContact => {
  const res = await axios.post(baseUrl, newContact)
  return res.data
}

const getContacts = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default {
  saveContact,
  getContacts
}