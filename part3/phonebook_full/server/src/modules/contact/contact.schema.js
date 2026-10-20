import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'contact name is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'contact phone number is required']
  },
})

contactSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

export default mongoose.model('Contact', contactSchema)