import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('please give your MongoDB password as an argument')
  process.exit(1)
}

const password = process.argv[2]
const mongoURI = `mongodb+srv://kimarimt:${password}@cluster0.of2o7.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(mongoURI, { family: 4 })

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
})

const Contact = new mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  Contact
    .find({})
    .then(contacts => {
      console.log('Phonebook:')
      contacts.forEach(contact => {
        console.log(`${contact.name} ${contact.phoneNumber}`)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const newContact = new Contact({
    name: process.argv[3],
    phoneNumber: process.argv[4]
  })

  newContact
    .save()
    .then(result => {
      console.log(`Added ${result.name} number ${result.phoneNumber} to Phonebook`)
      mongoose.connection.close()
    })
} else {
  console.log('error: invalid operation')
  process.exit(1)
}
