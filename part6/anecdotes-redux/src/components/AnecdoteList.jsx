import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdotesReducer'
import { toggleNotification } from '../reducers/notificationReducer'
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

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    const message = `You voted for '${anecdote.text}'`
    dispatch(toggleNotification(message))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <p key={anecdote.id}>
          {anecdote.text}<br />
          has {anecdote.votes} votes.
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </p>
      )}
    </>
  )
}

export default AnecdoteList