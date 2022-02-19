import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, destroyBlog } from './../reducers/blogsReducer'

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

      <div>
        <div>
          <a rel="noopener noreferrer" href={url} target="_blank">
            {url}
          </a>
        </div>
        <span data-test="blog-likes">Likes: {likes}</span>
        <button style={likeButtonStyle} data-test="blog-like-button" onClick={handleLike}>
          👍
        </button>
        <div>Added by {user.name}</div>
      </div>
      <div>
        <button onClick={handleRemove} data-test="blog-remove-button">
          Remove
        </button>
      </div>

      <h3>Comments</h3>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
