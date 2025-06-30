import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdotesReducer'
import { toggleNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    const text = event.target.text.value
    dispatch(addAnecdote(text))
    toggleNotification(text, dispatch)
    event.target.text.value = ''
  }

  return (
    <>
      <h2>New Anecdote</h2>
      <form onSubmit={handleSubmit}>
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