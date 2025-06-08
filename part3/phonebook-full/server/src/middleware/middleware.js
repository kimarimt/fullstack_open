const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'TypeError' && err.message.includes('null')) {
    return res.status(404).send({ error: 'resource not found' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  } else if (err.name === 'MongoServerError' && err.message.includes('E1100')) {
    return res.status(400).send({ error: 'contact already exists' })
  }

  next(err)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

export default {
  errorHandler,
  unknownEndpoint
}