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
    setAnecdote: (state, action) => {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

const { addAnecdote, setAnecdote, setAnecdotes } = anecdotesSlice.actions

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

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(anecdote.id, newAnecdote)
    dispatch(setAnecdote(updatedAnecdote))
  }
}

export default anecdotesSlice.reducer