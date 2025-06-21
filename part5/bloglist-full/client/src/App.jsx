import { useEffect, useState } from 'react'
import loginService from './services/login'
import blogService from './services/blog'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = window.localStorage.getItem('blogAppUser')

    if (userData) {
      const userObj = JSON.parse(userData)
      blogService.setToken(userObj.token)
      setUser(userObj)
    }
  }, [])

  const loginUser = async (credentials) => {
    try {
      const userData = await loginService.login(credentials)
      window.localStorage.setItem(
        'blogAppUser', JSON.stringify(userData)
      )
      blogService.setToken(userData.token)
      
      setUser(userData)
    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('blogAppUser')
    blogService.setToken(null)
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