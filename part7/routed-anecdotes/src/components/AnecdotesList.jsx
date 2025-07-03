import { Link } from 'react-router-dom'

const AnecdotesList = ({ anecdotes }) => {
  return (
    <>
      <h2>Anecdotes</h2>
      <ul className='anecdotes__list'>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default AnecdotesList