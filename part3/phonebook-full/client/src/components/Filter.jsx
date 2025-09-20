const Filter = ({ filter, onChange }) => (
  <div>
    <label htmlFor='search'>Search Contacts: </label>
    <input 
      id='search'
      type='text'
      value={filter}
      onChange={onChange} 
    />
  </div>
)

export default Filter