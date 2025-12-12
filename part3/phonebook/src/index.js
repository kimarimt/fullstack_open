import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>')
})

const port = 3001
app.listen(port, () => {
  console.log(`⚡[server]: running on port ${port}`)
})