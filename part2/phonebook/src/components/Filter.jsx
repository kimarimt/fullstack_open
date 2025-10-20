export default function Filter({ search, onChange }) {
  return (
    <div>
      <label htmlFor='search'>Search Contacts: </label>
      <input 
        id='search'
        type='text' 
        value={search}
        onChange={onChange}
      />
    </div>
  )
}