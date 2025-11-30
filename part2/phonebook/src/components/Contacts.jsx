const Contacts = ({ contacts }) => (
  <>
    {contacts.map(contact => 
      <p key={contact.name}>{contact.name} {contact.phoneNumber}</p>
    )}
  </>
)

export default Contacts