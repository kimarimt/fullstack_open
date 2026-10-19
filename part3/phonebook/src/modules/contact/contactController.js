import contactService from './contactService.js'

const getInfo = (req, res) => {
  const contacts = contactService.findAllContacts()
  const currentDate = new Date().toString()
  const contactsInfo = `<p>Phonebook currently has ${contacts.length} contacts</p><p>${currentDate}</p>`
  return res.status(200).send(contactsInfo)
}

const getAllContacts = (req, res) => {
  const contacts = contactService.findAllContacts();
  return res.status(200).json(contacts)
}

export default {
  getInfo,
  getAllContacts
}