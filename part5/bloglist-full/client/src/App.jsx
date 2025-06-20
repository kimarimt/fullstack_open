import { useState } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'

const App = () => {
  const [user, setUser] = useState(null)

  const loginUser = async (credentials) => {
    try {
      const result = await loginService.login(credentials)
      setUser(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {!user && <LoginForm login={loginUser} />}
      {user &&  <HomePage user={user} />}
    </>
  )
}

export default App