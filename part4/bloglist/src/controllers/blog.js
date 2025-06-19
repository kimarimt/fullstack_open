import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Blog from '../models/blog.js'
import User from '../models/user.js'

dotenv.config()

const router = express.Router()

const getTokenForm = (req) => {
  const auth = req.get('authorization')

  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }

  return null
}

router.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(getTokenForm(req), process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res.status(400).send({ error: 'user not found' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
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
