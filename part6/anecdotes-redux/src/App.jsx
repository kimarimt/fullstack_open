import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <>
      <h1>Redux Anecdotes</h1>
      <AnecdoteForm /> 
      <AnecdoteList />
    </>
  )
}

export default App