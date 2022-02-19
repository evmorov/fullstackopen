const commentsRouter = require('express').Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/', async (request, response, next) => {
  const { body, params } = request

  const comment = new Comment({
    text: body.text,
    blog: params.blogId,
  })

  try {
    const savedComment = await comment.save()
    const blog = await Blog.findById(params.blogId)
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = commentsRouter
