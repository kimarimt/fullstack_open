import express from 'express'
import middleware from '../utils/middleware.js'
import Blog from '../models/blog.js'

const router = express.Router()

router.post('/', middleware.userExtractor, async (req, res) => {
  const blog = new Blog({
    ...req.body,
    user: req.user._id,
  })

  const savedBlog = await blog.save()
  req.user.blogs.push(savedBlog.id)
  await req.user.save()

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

router.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).send({ error: 'blog not found' })
  }

  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(401).send({ error: 'user unauthorized' })
  }

  req.user.blogs.pull({ _id: blog.id })
  await blog.deleteOne()
  await req.user.save()
  res.status(204).end()
})

export default router
