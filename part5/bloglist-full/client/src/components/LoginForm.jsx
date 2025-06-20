import { useState } from 'react'
import Notification from './Notification'

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
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  )
}

export default LoginForm