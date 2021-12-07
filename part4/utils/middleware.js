const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  try {
    const authorization = request.get('authorization')
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
      throw new Error('No authorization bearer token found')
    }
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    if (!user) {
      throw new Error("User isn't found")
    }
    request.currentUser = user
  } catch (exception) {
    logger.error(exception)
    return response.status(401).send({ error: 'Not authorized' })
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  userExtractor,
  unknownEndpoint,
  errorHandler,
}
