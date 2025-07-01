import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  
  const handleVote = (anecdote) => {
    console.log(`you voted for ${anecdote.text}`)
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
                has {anecdote.votes}
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