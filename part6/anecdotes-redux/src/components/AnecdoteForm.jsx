import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()

    const text = event.target.text.value
    dispatch(createAnecdote(text))
    event.target.text.value = ''
  }

  return (
    <>
      <h2>New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <label htmlFor='text'>Text: </label>
          <input type='text' name='text' id='text' />
        </div>
        <button>add</button>
      </form>
    </>
  )
}

export default AnecdoteForm