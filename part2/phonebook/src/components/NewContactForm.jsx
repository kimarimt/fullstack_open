import { useState } from 'react'

export default function NewContactForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const isSaved = onSubmit({ name, phoneNumber })

    if (isSaved) {
      setName('')
      setPhoneNumber('')
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
        <label htmlFor='phoneNumber'>Phone Number: </label>
        <input 
          id='phoneNumber'
          type='text' 
          value={phoneNumber}
          onChange={({ target }) => setPhoneNumber(target.value)}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}