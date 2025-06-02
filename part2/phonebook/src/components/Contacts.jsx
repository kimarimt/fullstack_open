const Contacts = ({ contacts }) => (
  <>
    {
      contacts.map(contact =>
        <p key={contact.id}>
          {contact.name} {contact.phoneNumber}
        </p>
      )
    }
  </>
)

export default Contacts