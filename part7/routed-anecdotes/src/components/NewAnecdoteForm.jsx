import { useNavigate } from 'react-router-dom'
import { useField } from '../utils/hooks'

const NewAnecdoteForm = ({ addNew }) => {
  const navigate = useNavigate()
  const { reset: contentReset, ...content } = useField('content')
  const { reset: authorReset, ...author } = useField('author')
  const { reset: infoReset, ...info } = useField('info', 'url')

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

  const resetForm = () => {
    contentReset()
    authorReset()
    infoReset()
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
        <button type='reset' onClick={resetForm}>reset</button>
      </form>
    </>
  )
}

export default NewAnecdoteForm