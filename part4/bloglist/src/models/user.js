import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: String,
  passwordHash: String,
  username: String,
})

userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj._name
    delete obj._passwordHash
  },
})

export default mongoose.model('User', userSchema)
