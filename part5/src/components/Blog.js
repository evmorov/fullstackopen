import React, { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog: { title, author, url, likes, user }, blog, updateBlog, destroyBlog }) => {
  const toggleDetailsRef = useRef()

  const likeButtonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  }

  const handleLike = (event) => {
    event.preventDefault()
    const editedBlog = { ...blog, likes: likes + 1 }

    updateBlog(editedBlog)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    window.confirm(`Remove blog ${title} by ${author}`)

    destroyBlog(blog)
  }

  return (
    <div style={{ marginBottom: 10 }} data-test="blog">
      <span data-test="blog-main">
        {title}, {author}
      </span>{' '}
      <Togglable showLabel="+" hideLabel="-" hidePosition="top" ref={toggleDetailsRef}>
        <div data-test="blog-extra">
          <div>{url}</div>
          <span data-test="blog-likes">Likes: {likes}</span>
          <button style={likeButtonStyle} data-test="blog-like-button" onClick={handleLike}>
            👍
          </button>
          <div>Owner: {user.name}</div>
        </div>
        <div>
          <button onClick={handleRemove} data-test="blog-remove-button">Remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
