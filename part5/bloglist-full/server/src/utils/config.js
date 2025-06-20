import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3003
const mongoUri = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

export default {
  port,
  mongoUri,
}
