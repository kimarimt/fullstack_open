import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
})

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
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
