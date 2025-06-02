import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'

const getContacts = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default {
  getContacts
}