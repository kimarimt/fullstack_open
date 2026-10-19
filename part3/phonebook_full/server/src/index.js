import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import contactController from './modules/contact/contact.controller.js'
import contactRoutes from './modules/contact/contact.routes.js'

const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors())

// Logger midderware
app.use(morgan('tiny', {
  skip: (req, res) => {
    return req.method === 'POST'
  }
}))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req, res) => {
    return req.method !== 'POST'
  }
}))


app.get('/info', contactController.getInfo)
app.use('/api/contacts', contactRoutes)

app.listen(port, () => {
  console.log(`[server] Running on port ${port}`)
})