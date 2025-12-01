const Contacts = ({ contacts, onDelete }) => (
  <>
    {contacts.map(contact => 
      <p key={contact.name}>
        {contact.name} {contact.phoneNumber}{' '}
        <button onClick={() => onDelete(contact)}>delete</button>
      </p>
    )}
  </>
)

export default Contacts