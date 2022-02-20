const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const requireCurrentUser = require('./../utils/middleware').requireCurrentUser

blogsRouter.get('/', requireCurrentUser, async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 })
  response.json(blogs)
})

blogsRouter.post('/', requireCurrentUser, async (request, response, next) => {
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
    const savedBlogWithUser = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(savedBlogWithUser).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', requireCurrentUser, async (request, response, next) => {
  const { body, currentUser, params } = request

  const blog = await Blog.findById(params.id)

  if (blog.user.toString() !== currentUser._id.toString()) {
    return response.status(403).json({ error: 'Forbidden' }).end()
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      { likes: body.likes },
      { new: true, runValidators: true },
    ).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', requireCurrentUser, async (request, response, next) => {
  const { currentUser, params } = request

  const blog = await Blog.findById(params.id)

  if (blog.user.toString() !== currentUser._id.toString()) {
    return response.status(403).json({ error: 'Forbidden' }).end()
  }

  try {
    await blog.remove()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
