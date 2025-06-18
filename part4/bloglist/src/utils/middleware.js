const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  else if (err.name === 'MongooseError' && err.message === 'user already exists') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

export default {
  unknownEndpoint,
  errorHandler,
}
