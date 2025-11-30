const Filter = ({ search, onChange }) => (
  <div>
    <label htmlFor='search'>Search contacts: </label>
    <input
      id='search'
      type='text'
      value={search}
      onChange={onChange}
    />
  </div>
)

export default Filter