import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdotesList from './components/AnecdotesList'
import About from './components/About'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import Footer from './components/Footer'

const App = () => {
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

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
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

  return (
    <>
      <h1>Software Anecdotes</h1>
      <Menu />
      <Routes>
        <Route path='/' element={<AnecdotesList anecdotes={anecdotes} />} />
        <Route path='/create' element={<NewAnecdoteForm addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App