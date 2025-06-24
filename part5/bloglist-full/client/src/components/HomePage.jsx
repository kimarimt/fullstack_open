import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blog'
import BlogForm from './BlogForm'
import BlogItem from './BlogItem'
import Notification from './Notification'
import Togglable from './Toggable'

const HomePage = ({ user, onClick }) => {
  const [blogs, setBlogs] = useState(null)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result)
    }

    fetchBlogs()
  }, [])

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(savedBlog))
      const message = `${savedBlog.title} by ${savedBlog.author} added`
      blogFormRef.current.toggleVisibility()
      toggleNotification(message, 'green')
    } catch (err) {
      toggleNotification(err.response.data.error, 'red')
    }
  }

  const toggleNotification = (msg, color) => {
    setMessage(msg)
    setColor(color)
 
    setTimeout(() => {
      setMessage(null)
      setColor(null)
    }, 3000)
  }

  return (
    <>
      {blogs && (
        <>
          <h1>Blog App</h1>
          {message && color && <Notification message={message} color={color} />}
          <p>{user.name} logged in <button onClick={onClick}>logout</button></p>
          <Togglable buttonLabel='add blog' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <BlogItem key={blog.id} blog={blog} />
          )}
        </>
      )}
    </>
  )
}

export default HomePage