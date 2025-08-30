const SearchBar = ({ search, onChange }) => (
  <div>
    <label htmlFor='search'>Search Contacts: </label>
    <input
      type='text'
      name='search'
      id='search'
      value={search}
      onChange={onChange}
    />
  </div>
)

export default SearchBar