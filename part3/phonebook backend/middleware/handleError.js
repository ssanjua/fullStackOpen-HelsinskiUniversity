module.exports = (error, req, res, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    res.status(400).send({ error: 'id is bad' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  }
  next(error)
}