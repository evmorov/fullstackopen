import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { updateBlog, destroyBlog } from './../reducers/blogsReducer'
import Comments from './Comments'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector((state) => state.blogs.entries)

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (!blog) return null

  const { title, author, url, likes, user, comments } = blog

  const likeButtonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  }

  const handleLike = (event) => {
    event.preventDefault()
    const editedBlog = { ...blog, likes: likes + 1 }

    dispatch(updateBlog(editedBlog))
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      history.push('/')
      dispatch(destroyBlog(blog))
    }
  }

  return (
    <div>
      <h2>
        {title}, {author}
      </h2>

      <div style={{ marginBottom: 10 }}>
        <a rel="noopener noreferrer" href={url} target="_blank">
          {url}
        </a>
        <span data-test="blog-likes">Likes: {likes}</span>
        <button style={likeButtonStyle} data-test="blog-like-button" onClick={handleLike}>
          👍
        </button>
        <div>Added by {user.name}</div>
        <Button onClick={handleRemove} variant="danger" data-test="blog-remove-button">
          Remove
        </Button>
      </div>

      <Comments comments={comments} />
    </div>
  )
}

export default Blog
