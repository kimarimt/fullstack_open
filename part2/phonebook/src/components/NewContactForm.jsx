import { useState } from 'react'

const NewContactForm = ({ addPerson }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    const success = addPerson({ name, number })

    if (success) {
      setName('')
      setNumber('')
    }
  }

  return (
    <>
      <h2>New Contact</h2>
      <form onSubmit={handleChange}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor='number'>Number: </label>
          <input
            type='text'
            name='number'
            id='number'
            value={number}
            onChange={({ target }) => setNumber(target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

export default NewContactForm