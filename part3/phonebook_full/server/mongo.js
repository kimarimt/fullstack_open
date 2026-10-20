import mongoose from 'mongoose'

const args = process.argv.slice(2)

if (args.length === 1 || args.length === 3) {
   const password = args[0]
   const connectionUrl = `mongodb+srv://kimarimt:${password}@cluster0.of2o7.mongodb.net/`

   mongoose.set('strictQuery', false)
   mongoose
      .connect(connectionUrl, { family: 4 })
      .then(() => {
         console.log('[server] connected to MongoDB database')
      })

   const contactSchema = new mongoose.Schema({
      name: String,
      phoneNumber: String,
   })

   const Contact = mongoose.model('Contact', contactSchema)

   if (args.length === 1) {
      Contact
         .find({})
         .then(contacts => {
            console.log('Phonebook:')
            contacts.forEach(contact => {
               console.log(`${contact.name} ${contact.phoneNumber}`)
            })
            mongoose.connection.close()
         })
   } else if (args.length === 3) {
      const [name, phoneNumber] = args.slice(1)
      
      const contact = new Contact({
         name,
         phoneNumber
      })

      contact.save().then(savedContact => {
         console.log(`added ${savedContact.name} ${savedContact.phoneNumber} to contacts`)
         mongoose.connection.close()
      })
   }
}