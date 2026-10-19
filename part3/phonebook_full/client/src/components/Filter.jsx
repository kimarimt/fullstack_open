const Filter = ({ onTermChange }) => {
    
  const handleTermChange = (event) => {
    onTermChange(event.target.value)
  }

  return (
    <div>
      <label>Search Contacts: </label>
      <input 
          type='text'
          onChange={handleTermChange}
      />
    </div>
  )
}

export default Filter