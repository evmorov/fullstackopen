import React from 'react'
import CommentForm from './CommentForm'
import { ListGroup } from 'react-bootstrap'

const Comments = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>

      <CommentForm />

      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.text}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Comments
