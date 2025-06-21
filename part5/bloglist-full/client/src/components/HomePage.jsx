import { useState, useEffect } from 'react'
import blogService from '../services/blog'
import BlogForm from './BlogForm'

const HomePage = ({ user, onClick }) => {
  const [blogs, setBlogs] = useState(null)

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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {blogs && (
        <>
          <h1>Blog App</h1>
          <p>{user.name} logged in <button onClick={onClick}>logout</button></p>
          <BlogForm addBlog={addBlog} />
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <p key={blog.id}>{blog.title} {blog.author}</p>
          )}
        </>
      )}
    </>
  )
}

export default HomePage