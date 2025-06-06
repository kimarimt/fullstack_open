import express from 'express'
import contactsRouter from './controllers/contacts.js'

const port = 3001
const app = express()

app.use('/api/contacts', contactsRouter)

app.listen(port, () => {
  console.log(`[server]: Listening at http://localhost:${port}`)
})
