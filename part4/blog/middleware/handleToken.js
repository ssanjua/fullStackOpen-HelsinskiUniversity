const jwt = require('jsonwebtoken')
require('dotenv').config()


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = (request, response, next) => {
  const token = getTokenFrom(request)
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      request.user = decodedToken
    } catch (error) {
      return response.status(401).json({ error: 'token invalid' })
    }
  } else {
    return response.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
}