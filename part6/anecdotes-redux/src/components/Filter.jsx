import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input 
        type='text' 
        name='search' 
        id='search' 
        onChange={({ target }) => dispatch(setFilter(target.value))}
      />
    </div>
  )
}

export default Filter