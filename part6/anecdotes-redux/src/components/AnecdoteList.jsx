import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdotesReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const getFilter = (state) => state.filter
  const getAnecdotes = (state) => state.anecdotes

  const getFilteredAnecdotes = createSelector([getFilter, getAnecdotes], (filter, anecdotes) => {
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

    return filter
      ? sortedAnecdotes.filter(a => a.text.includes(filter))
      : sortedAnecdotes
  })

  const anecdotes = useSelector(getFilteredAnecdotes)

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <p key={anecdote.id}>
          {anecdote.text}<br />
          has {anecdote.votes} votes.
          <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
        </p>
      )}
    </>
  )
}

export default AnecdoteList