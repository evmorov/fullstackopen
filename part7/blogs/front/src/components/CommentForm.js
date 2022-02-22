import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
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
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control
            type="text"
            value={text}
            name="text"
            autoComplete="commenttext"
            onChange={({ target }) => setText(target.value)}
          />
          <Button type="submit" variant="primary" style={{ marginTop: 10, marginBottom: 10 }}>
            Add comment
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

CommentForm.displayName = 'CommentForm'

export default CommentForm
