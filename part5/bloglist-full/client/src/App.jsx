import { useEffect, useState } from 'react'
import loginService from './services/login'
import blogService from './services/blog'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState(null)

  useEffect(() => {
    const userData = window.localStorage.getItem('blogAppUser')

    if (userData) {
      const userObj = JSON.parse(userData)
      blogService.setToken(userObj.token)
      setUser(userObj)
    }
  }, [])

  const toggleNotification = (msg, color) => {
    setMessage(msg)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
      setColor(null)
    }, 3000)
  }

  const loginUser = async (credentials) => {
    try {
      const userData = await loginService.login(credentials)
      window.localStorage.setItem(
        'blogAppUser', JSON.stringify(userData)
      )
      blogService.setToken(userData.token)

      setUser(userData)
    } catch (err) {
      toggleNotification(err.response.data.error, 'red')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('blogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <>
      {!user && <LoginForm
        login={loginUser}
        message={message}
        color={color} />
      }
      {user && <HomePage
        user={user}
        onClick={logout} />
      }
    </>
  )
}

export default App