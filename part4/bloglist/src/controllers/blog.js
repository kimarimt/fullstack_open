import express from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const router = express.Router()

router.post('/', async (req, res) => {
  if (!('userId' in req.body)) {
    return res.status(400).send({ error: 'userId is required' })
  }

  const user = await User.findById(req.body.userId)

  if (!user) {
    return res.status(400).send({ error: 'user not found' })
  }

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    user: req.body.userId,
  })

  const savedBlog = await blog.save()
  user.blogs.push(savedBlog.id)
  await user.save()

  res.status(201).json(savedBlog)
})

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { blogs: 0 })

  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('user', { blogs: 0 })

  if (!blog) {
    return res.status(404).send({ error: 'blog not found' })
  }

  res.json(blog)
})

router.put('/:id', async (req, res) => {
  const update = { $inc: { likes: 1 } }
  const options = { new: true }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, update, options)

  if (!updatedBlog) {
    return res.status(404).send({ error: 'blog not found' })
  }

  return res.json(updatedBlog)
})

router.delete('/:id', async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id)

  if (!deletedBlog) {
    return res.status(404).send({ error: 'blog not found' })
  }

  res.status(204).end()
})

export default router
