import { useState, useEffect } from 'react'
import blogService from '../services/blog'

const HomePage = ({ user, onClick }) => {
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result)
    }

    fetchBlogs()
  }, [])

  return (
    <>
      {blogs && (
        <>
          <h1>Blogs</h1>
          <p>{user.name} logged in <button onClick={onClick}>logout</button></p>
          <hr />
          {blogs.map(blog =>
            <p key={blog.id}>{blog.title} {blog.author}</p>
          )}
        </>
      )}
    </>
  )
}

export default HomePage