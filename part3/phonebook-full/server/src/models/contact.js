import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Contact name required'],
    minLength: [3, 'Contact name must have at least 3 characters'],
    unique: [true, 'Contact already exists']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Contact phone number required'],
    validate: {
      validator: (v) => {
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

contactSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

export default mongoose.model('Contact', contactSchema)