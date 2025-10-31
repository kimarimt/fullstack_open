import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
})

contactSchema.set('toJSON', {
  transform: function(doc, obj) {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

export default new mongoose.model('Contact', contactSchema)