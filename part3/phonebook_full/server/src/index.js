import app from './app.js'
import config from './util/config.js'

app.listen(config.PORT, function () {
  console.log(`⚡[server] Listening at http://localhost:${config.PORT}`)
})