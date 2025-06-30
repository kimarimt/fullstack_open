const AnecdoteForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value 
    console.log(text)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='anecdote'>Text: </label>
        <input type='text' id='anecdote' name='anecdote' />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm