import { useEffect, useState } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = window.localStorage.getItem('blogAppUser')

    if (userData) {
      const userObj = JSON.parse(userData)
      setUser(userObj)
    }
  }, [])

  const loginUser = async (credentials) => {
    try {
      const userData = await loginService.login(credentials)
      window.localStorage.setItem(
        'blogAppUser', JSON.stringify(userData)
      )
      
      setUser(userData)
    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }

  return (
    <>
      {!user && <LoginForm login={loginUser} />}
      {user &&  <HomePage user={user} onClick={logout} />}
    </>
  )
}

export default App