const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('./../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const { body, currentUser } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: currentUser._id,
  })

  try {
    const savedBlog = await blog.save()
    currentUser.blogs = currentUser.blogs.concat(savedBlog._id)
    await currentUser.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes: body.likes },
      { new: true, runValidators: true },
    )
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { currentUser } = request

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== currentUser._id.toString()) {
    return response.status(403).json({ error: 'Forbidden' })
  }

  try {
    await blog.remove()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
