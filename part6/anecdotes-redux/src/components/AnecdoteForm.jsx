import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { addAnecdote, createAnecdote } from '../reducers/anecdotesReducer'
import { toggleNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const text = event.target.text.value
    const newAnecdote = createAnecdote(text)
    const savedAnecdote = await anecdoteService.create(newAnecdote)
    
    dispatch(addAnecdote(savedAnecdote))
    toggleNotification(`added ${savedAnecdote.text}`, dispatch)
    
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