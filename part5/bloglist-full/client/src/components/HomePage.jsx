import { useState, useEffect } from 'react'
import blogService from '../services/blog'

const HomePage = ({ user }) => {
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      console.log(result)
      setBlogs(result)
    }

    fetchBlogs()
  }, [])

  return (
    <>
      {blogs && (
        <>
          <h1>Blogs</h1>
          <p>{user.name} logged in</p>
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