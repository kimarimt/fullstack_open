import express from 'express'

const port = 3000
const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello from Express Server')
})

app.listen(port, () => {
  console.log(`[server] Running on port ${port}`)
})