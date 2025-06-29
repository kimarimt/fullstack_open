import { useDispatch, useSelector } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => 
    state.anecdotes.toSorted((a, b) => b.votes - a.votes)
  )

  return (
    <>
      <h1>Redux Anecdotes</h1>
      <AnecdoteForm />      
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

export default App