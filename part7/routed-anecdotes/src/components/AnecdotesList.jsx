const AnecdotesList = ({ anecdotes }) => {
  return (
    <>
      <h2>Anecdotes</h2>
      <ul className='anecdotes__list'>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <p>{anecdote.content}</p>
          </li>
        )}
      </ul>
    </>
  )
}

export default AnecdotesList