import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('Please enter MongoDB password as an argument')
  process.exit(1)
}

const password = process.argv[2]
const mongodbUri = `mongodb+srv://kimarimt:${password}@cluster0.of2o7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(mongodbUri)
  .then(() => {
    console.log('MongoDB connection successful')
  })
  .catch(err => {
    console.log('error connecting to MongoDB: ', err)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({})
    .then(persons => {
      console.log('\nPhonebook:')
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  newPerson.save({})
    .then(savedPerson => {
      console.log(`\nAdded ${savedPerson.name} number ${savedPerson.number} to phonebook`)
      mongoose.connection.close()
    })
}