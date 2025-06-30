import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = [
    {
      'text': 'If it hurts, do it more often',
      'id': '47145',
      'votes': 0
    }
  ]

  const handleVote = (anecdote) => {
    console.log(`you voted for ${anecdote.text}`)
  }

  return (
    <div>
      <h1>Anecdote App</h1>
      <Notification />
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
  )
}

export default App