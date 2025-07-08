import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 

const NewAnecdoteForm = ({ addNew }) => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    addNew({
      content,
      author,
      info,
      votes: 0,
    })

    navigate('/')
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='content'>Content: </label>
          <input 
            type='text' 
            name='content'
            id='content'
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input 
            type='text' 
            name='author'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor='info'>Link for more info: </label>
          <input 
            type='url' 
            name='info'
            id='info'
            value={info}
            onChange={({ target }) => setInfo(target.value)}
          />
        </div>
        <button>add</button>
      </form>
    </>
  )
}

export default NewAnecdoteForm