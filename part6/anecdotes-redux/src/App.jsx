import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdotesReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAnecdotes = async () => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }

    fetchAnecdotes()
  }, [dispatch])

  return (
    <>
      <h1>Redux Anecdotes</h1>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm /> 
    </>
  )
}

export default App