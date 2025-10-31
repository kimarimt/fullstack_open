import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('please pass the database connection password as an argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://kimarimt:${password}@cluster0.of2o7.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 5) {
  const newContact = new Contact({
    name: process.argv[3],
    phoneNumber: process.argv[4]
  })

  newContact.save().then(savedContact => {
    console.log(`added ${savedContact.name} number ${savedContact.phoneNumber} to contacts`)
    mongoose.connection.close()
  })
} else {
  console.log('Phonebook:')

  Contact.find({}).then(contacts => {
    contacts.forEach(contact => {
      console.log(`${contact.name} ${contact.phoneNumber}`)
    })
    
    mongoose.connection.close()
  })
}