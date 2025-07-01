import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed()

export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createAnecdote = async (newAnecdote) => {
  newAnecdote.id = getId()
  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}
