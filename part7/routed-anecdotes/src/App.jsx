import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import Notification from './components/Notification'
import AnecdotesList from './components/AnecdotesList'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdoteDetail from './components/AnecdoteDetail'

const App = () => {
    const match = useMatch('/anecdotes/:id')
    const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [message, setMessage] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    toggleNotification(`a new anecdote ${anecdote.content} created!`)
  }

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const toggleNotification = (message, secs = 5000) => {
    setMessage(message)

    setTimeout(() => {
      setMessage(null)
    }, secs)
  }

  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <>
      <h1>Software Anecdotes</h1>
      <Menu />
      { message && <Notification message={message} /> }
      <Routes>
        <Route path='/anecdotes/:id' element={<AnecdoteDetail anecdote={anecdote} />} />
        <Route path='/' element={<AnecdotesList anecdotes={anecdotes} />} />
        <Route path='/create' element={<NewAnecdoteForm addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App