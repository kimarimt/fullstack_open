const ContactsList = ({ searchTerm, contacts, onContactDelete }) => {
  const filteredContacts = searchTerm
    ? contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : contacts

  return (
     <div>
        <h2>Contacts</h2>
        {filteredContacts.map((contact) => 
          <p key={contact.id}>
            {contact.name} {contact.phoneNumber}
            <button onClick={() => onContactDelete(contact)}>
              delete
            </button>
          </p> 
        )}
      </div>
  )
}

export default ContactsList