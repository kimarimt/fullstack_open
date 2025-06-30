import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed()

const createAnecdote = (text) => {
  return {
    id: getId(),
    text,
    votes: 0
  }
}

const anecdotesSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote: (state, action) => {
      return [...state, createAnecdote(action.payload)]
    },
    addVote: (state, action) => {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)

      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }

      return state.map(a => a.id === id ? updatedAnecdote : a)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { addAnecdote, addVote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer