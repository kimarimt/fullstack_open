export default function Contacts({ contacts }) {
  return (
    <>
      {contacts.map(contact => 
        <p key={contact.name}>{contact.name} {contact.phoneNumber}</p>
      )}
    </>
  )
}