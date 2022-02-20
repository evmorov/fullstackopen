const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const requireCurrentUser = require('./../utils/middleware').requireCurrentUser

usersRouter.get('/', requireCurrentUser, async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const passwordRequredLength = 3
  if (!password || password.length < passwordRequredLength) {
    return response
      .status(400)
      .json({ error: `password must at least ${passwordRequredLength} chars long` })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
