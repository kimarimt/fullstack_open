import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>
    state.anecdotes.toSorted((a, b) => b.votes - a.votes)
  )

  return (
    <>
      <h2>Anecdotes</h2>
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