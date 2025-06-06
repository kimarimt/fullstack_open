const Contacts = ({ contacts, handleDelete }) => (
  <>
    {
      contacts.map(contact =>
        <p key={contact.id}>
          {contact.name} {contact.phoneNumber}{' '}
          <button
            onClick={() => handleDelete(contact)}
          >
            delete
          </button>
        </p>
      )
    }
  </>
)

export default Contacts