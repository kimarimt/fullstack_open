import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdotesReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAnecdotes = async () => {
      dispatch(initializeAnecdotes())
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