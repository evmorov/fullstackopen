import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from './../reducers/commentsReducer'

const CommentForm = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const commentRespond = useSelector((state) => state.comments.entryRespond)
  const blogs = useSelector((state) => state.blogs.entries)

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  useEffect(() => {
    clearForm()
  }, [commentRespond])

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment({ text }, blog))
  }

  const clearForm = () => {
    setText('')
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={text}
          name="text"
          autoComplete="commenttext"
          onChange={({ target }) => setText(target.value)}
        />{' '}
        <button type="submit">Add comment</button>
      </form>
    </div>
  )
}

CommentForm.displayName = 'CommentForm'

export default CommentForm
