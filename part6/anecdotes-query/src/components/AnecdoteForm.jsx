import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = ({ toggleNotification }) => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      toggleNotification(`'${newAnecdote.text}' added`)
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    await newAnecdoteMutation.mutateAsync({ text, votes: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='anecdote'>Text: </label>
        <input type='text' id='anecdote' name='anecdote' />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm