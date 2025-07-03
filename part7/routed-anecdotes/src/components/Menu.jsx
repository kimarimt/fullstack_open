import { Link } from 'react-router-dom'

const Menu = () => {
  const styles = {
    padding: 5
  }

  return (
    <>
      <Link style={styles} to='/'>Home</Link>
      <Link style={styles} to='/create'>New Anecdote</Link>
      <Link style={styles} to='/about'>About</Link>
    </>
  )
}

export default Menu