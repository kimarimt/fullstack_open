import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'blog title is required'],
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    required: [true, 'blog url is required'],
  },
  likes: {
    type: Number,
    default: 0,
  },
})

blogSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  },
})

export default mongoose.model('Blog', blogSchema)
