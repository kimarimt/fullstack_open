import { useState } from 'react'

const PersonForm = ({ addPerson }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const isSaved = addPerson({ name, number })

    if (isSaved) {
      setName('')
      setNumber('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name: </label>
        <input 
          id='name'
          type='text'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        <label htmlFor='number'>Number: </label>
        <input 
          id='number'
          type='text'
          value={number}
          onChange={({ target }) => setNumber(target.value)}
        />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default PersonForm