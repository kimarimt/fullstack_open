import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed()

const anecdotesSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote: (state, action) => {
      state.push(action.payload)
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (text) => {
  return async dispatch => {
    const newAnecdote = {
      id: getId(),
      text,
      votes: 0
    }

    const savedAnecdote = await anecdoteService.create(newAnecdote)
    dispatch(addAnecdote(savedAnecdote))
  }
}

export default anecdotesSlice.reducer