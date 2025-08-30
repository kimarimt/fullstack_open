const Contacts = ({ searchResults }) => (
  <>
    <h2>Contacts</h2>
    {
      searchResults.length !== 0 ? (
        <>
          {searchResults.map((person) => (
            <p id={person.name}>{person.name} {person.number}</p>
          ))}
        </>
      ) : <p>No Contacts found!</p>
    }
  </>
)

export default Contacts