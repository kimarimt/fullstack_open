import express from 'express'
import contactsRouter,
{ contacts } from './controllers/contacts.js'

const port = 3001
const app = express()

app.use('/api/contacts', contactsRouter)

app.get('/info', (req, res) => {
  const currentDate = new Date()

  res.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${currentDate.toDateString()} ${currentDate.toTimeString()}</p>`)
})

app.listen(port, () => {
  console.log(`[server]: Listening at http://localhost:${port}`)
})
