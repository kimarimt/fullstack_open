import axios from 'axios'

let token = null

const baseUrl = '/api/blogs'

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const addBlog = async (blogObj) => {
  const config = {
    headers: {
      Authorization: token
    },
  }

  const res = await axios.post(baseUrl, blogObj, config)
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default {
  token,
  setToken,
  addBlog,
  getAll,
}