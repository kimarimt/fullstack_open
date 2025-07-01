import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updateAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updateAnecdote.id ? updateAnecdote : anecdote))
    }
  })

  const handleVote = async (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    await updateAnecdoteMutation.mutateAsync(newAnecdote)
  }

  const anecdotes = data

  return (
    <>
      {isLoading && <p>loading data...</p>}
      {isError && <p>anecdote service not available due to problems in the server</p>}
      {anecdotes && (
        <div>
          <h1>Anecdote App</h1>
          {/* <Notification /> */}
          <AnecdoteForm />
          {anecdotes.map(anecdote => (
            <div key={anecdote.id}>
              <p>{anecdote.text}</p>
              <p>
                has {anecdote.votes}{' '}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App