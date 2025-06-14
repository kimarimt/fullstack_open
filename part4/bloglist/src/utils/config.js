import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3003
const mongoUri = process.env.MONGODB_URI

export default {
  port,
  mongoUri,
}
