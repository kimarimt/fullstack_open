import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const create = async (newAnecdote) => {
  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default {
  create,
  getAll
}