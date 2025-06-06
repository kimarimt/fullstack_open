const Filter = ({ search, onChange }) => (
  <>
    <label htmlFor='search'>Search Contacts: </label>
    <input
      id='search'
      name='search'
      onChange={onChange}
      type='text'
      value={search}
    />
  </>
)

export default Filter