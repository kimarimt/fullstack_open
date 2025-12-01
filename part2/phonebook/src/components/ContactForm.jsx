import { useState } from 'react'

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const success = await addContact(name, phoneNumber)
    if (success) {
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

export default ContactForm