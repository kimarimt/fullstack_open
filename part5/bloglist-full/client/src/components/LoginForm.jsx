import { useState } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ login, message, color }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h1>Log In</h1>
      {message && color && <Notification message={message} color={color} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            data-testid='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type='text'
            name='password'
            id='password'
            data-testid='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default LoginForm
