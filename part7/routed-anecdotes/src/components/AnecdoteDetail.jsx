import { Link } from "react-router-dom"

const AnecdoteDetail = ({ anecdote }) => (
  <>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>
      for more info see{' '}
      <a href={anecdote.info} target='_blank'>
        {anecdote.info}
      </a>
    </p>
  </>
)

export default AnecdoteDetail