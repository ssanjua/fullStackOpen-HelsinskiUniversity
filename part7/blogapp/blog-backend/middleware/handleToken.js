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
  const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  } 

  let decodedToken = {}
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    console.log(error)
  }
  
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
}