import express from 'express'
import Blog from '../models/blog.js'
import blog from '../models/blog.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
})

router.delete('/:id', async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id)

  if (deletedBlog) {
    return res.status(204).send({ error: 'blog not found' })
  }

  res.status(404).end()
})

export default router
