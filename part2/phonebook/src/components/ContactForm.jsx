import { useState } from 'react'

const ContactForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const success = onFormSubmit(name, phoneNumber)
    if (success) {
      setName('')
      setPhoneNumber('')
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  return (
    <div>
      <h2>New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input 
            id='name'
            name='name'
            type='text'
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor='phoneNumber'>Number: </label>
          <input 
            id='phoneNumber' 
            name='phoneNumber' 
            type='text'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div>
          <button type='submit'>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm