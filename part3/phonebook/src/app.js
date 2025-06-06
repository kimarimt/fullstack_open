import express from 'express'

const port = 3001
const app = express()

app.get('/', (req, res) => {
  res.send("<h1>Hello, World</h1>")
})

app.listen(port, () => {
  console.log(`[server]: Listening at http://localhost:${port}`)
})
