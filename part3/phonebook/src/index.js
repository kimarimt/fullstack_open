import express from 'express'

import contactRoutes from './modules/contact/contactRoutes.js'

const port = 3000
const app = express()

app.use('/api/contacts', contactRoutes)

app.listen(port, () => {
  console.log(`[server] Running on port ${port}`)
})