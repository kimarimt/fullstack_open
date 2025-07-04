import Blog from '../models/blog.js'
import User from '../models/user.js'

let token = null

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const getErrMessage = (res, delimiter) => {
  return res.body.error.split(delimiter)[1]
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

export default {
  token,
  initialBlogs,
  getErrMessage,
  blogsInDB,
  usersInDB,
}
