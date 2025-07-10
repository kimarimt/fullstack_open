import { useNavigate } from 'react-router-dom'
import { useField } from '../utils/hooks'

const NewAnecdoteForm = ({ addNew }) => {
  const navigate = useNavigate()
  const content = useField('content')
  const author = useField('author')
  const info = useField('info', 'url')

  const handleSubmit = (event) => {
    event.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
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
          <input {...content} />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input {...author} />
        </div>
        <div>
          <label htmlFor='info'>Link for more info: </label>
          <input {...info} />
        </div>
        <button>add</button>
      </form>
    </>
  )
}

export default NewAnecdoteForm