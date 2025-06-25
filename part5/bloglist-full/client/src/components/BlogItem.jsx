import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogItem = ({ blog, user, onEdit, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const styles = {
    border: '3px solid #ccc',
    padding: '0 0.75rem',
    marginBottom: '1rem',
  }

  const buttonStyles = {
    display: 'block',
    marginBottom: '1rem',
  }

  return (
    <article style={styles}>
      <h3>
        {blog.title}
        {' '}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      </h3>
      {visible && (
        <div>
          <p>{blog.author}</p>
          <a href={blog.url} target='_blank'>{blog.url}</a>
          <p>
            likes
            {' '}
            {blog.likes}
            {' '}
            <button onClick={() => onEdit(blog.id)}>like</button>
          </p>
          <p>
            Added by
            {blog.user.name}
          </p>
          {blog.user.username === user.username
            && <button style={buttonStyles} onClick={() => onDelete(blog.id)}>Delete</button>}
        </div>
      )}
    </article>
  )
}

BlogItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: this.user,
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BlogItem
