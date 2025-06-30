import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (req, res, next) => {
  const { text } = req.body

  if (req.method === 'POST' && (!text || text.length < 5)) {
    return res.status(400).json({
      error: 'too short anecdote, must be at least 5 characters long'
    }) 
  } else {
    next()
  }
}

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})