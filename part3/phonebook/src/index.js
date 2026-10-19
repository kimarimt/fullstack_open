import express from 'express'

import contactController from './modules/contact/contact.controller.js'
import contactRoutes from './modules/contact/contact.routes.js'

const port = 3000
const app = express()

app.use(express.json())

app.get('/info', contactController.getInfo)
app.use('/api/contacts', contactRoutes)

app.listen(port, () => {
  console.log(`[server] Running on port ${port}`)
})