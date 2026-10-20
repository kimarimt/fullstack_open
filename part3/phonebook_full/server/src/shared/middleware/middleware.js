const errorMiddleware = (err, req, res, next) => {
  console.error(err)
  
  if (err.name === 'ValidationError') {
    res.status(400).json(err)
  } else if (err.name === 'APIError') {
    res.status(err.statusCode).json({ error: err.message })
  }
}

export default {
  errorMiddleware
}