export default function Contacts({ contacts, onClick }) {
  return (
    <>
      {contacts.map(contact => (
        <p key={contact.id}>
          {contact.name} {contact.phoneNumber}{' '}
          <button onClick={() => onClick(contact.id)}>delete</button>
        </p>
      ))}
    </>
  )
}