import { useState } from 'react'

const BlogItem = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const styles = {
    border: '3px solid #ccc',
    padding: '0 0.5rem',
    marginBottom: '1rem'
  }

  return (
    <article style={styles}>
      <h3>
        {blog.title}{' '}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      </h3>
      {visible && (
        <div>
          <p>{blog.author}</p>
          <a href={blog.url} target='_blank'>{blog.url}</a>
          <p>
            likes {blog.likes}{' '}
            <button>like</button>
          </p>
          <p>Added by {blog.user.name}</p>
        </div>
      )}
    </article>
  )
}

export default BlogItem