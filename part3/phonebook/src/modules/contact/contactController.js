import contactService from './contactService.js'

const getAllContacts = (req, res) => {
  const contacts = contactService.findAllContacts();
  return res.status(200).json(contacts)
}

export default {
  getAllContacts
}