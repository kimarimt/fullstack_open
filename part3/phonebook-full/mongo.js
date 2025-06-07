import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('please provide your mongodb password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kimarimt:${password}@cluster0.of2o7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  Contact.find({}).then(result => {
    console.log('phonebook:')
    
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.phoneNumber}`)
    })

    mongoose.connection.close()
  })
} else if (process.argv.length > 3) {
  const [name, phoneNumber] = process.argv.slice(3)

  const newContact = new Contact({
    name,
    phoneNumber
  })

  newContact.save().then(result => {
    console.log(`added ${result.name} number ${result.phoneNumber} to contacts`)
    mongoose.connection.close()
  })
}