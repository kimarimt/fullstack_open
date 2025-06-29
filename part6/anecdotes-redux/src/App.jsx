import { useDispatch, useSelector } from 'react-redux'
import { addVote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => 
    state.anecdotes.toSorted((a, b) => b.votes - a.votes)
  )

  const addAnecdote = (event) => {
    event.preventDefault()

    const text = event.target.text.value
    dispatch(createAnecdote(text))
    event.target.text.value = ''
  }

  return (
    <>
      <h1>Redux Anecdotes</h1>
      <h2>New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <label htmlFor='text'>Text: </label>
          <input type='text' name='text' id='text' />
        </div>
        <button>add</button>
      </form>
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