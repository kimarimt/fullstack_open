const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  else if (err.name === 'MongooseError' && err.message === 'user already exists') {
    return res.status(400).send({ error: err.message })
  }
  else if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'token invalid or it hasn\'t been provided' })
  }
  else if (err.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'Token expired' })
  }

  next(err)
}

export default {
  unknownEndpoint,
  errorHandler,
}
