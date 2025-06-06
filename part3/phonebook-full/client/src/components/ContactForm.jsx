import { useState } from 'react'

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    addContact(name, phoneNumber)
    setName('')
    setPhoneNumber('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>name: </label>
        <input
          id='name'
          name='name'
          onChange={({ target }) => setName(target.value)}
          type='text'
          value={name}
        />
      </div>
      <div>
        <label htmlFor='phone'>phone: </label>
        <input
          id='phone'
          name='phone'
          onChange={({ target }) => setPhoneNumber(target.value)}
          type='phone'
          value={phoneNumber}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default ContactForm