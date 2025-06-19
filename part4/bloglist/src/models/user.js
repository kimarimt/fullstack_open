import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: String,
  passwordHash: String,
  username: {
    type: String,
    required: [true, 'username is required'],
    minlength: [3, 'username must be a least 3 characters long'],
    unique: [true, 'user already exists'],
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.passwordHash
    delete obj.__v
  },
})

export default mongoose.model('User', userSchema)
