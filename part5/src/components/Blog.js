import React, { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog: { title, author, url, likes }, blog, updateBlog, destroyBlog }) => {
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
    <div style={{ marginBottom: 10 }}>
      <span>{title}</span>{' '}
      <Togglable showLabel="+" hideLabel="-" hidePosition="top" ref={toggleDetailsRef}>
        <div>{author}</div>
        <div>{url}</div>
        <span>Likes: {likes}</span>
        <button style={likeButtonStyle} onClick={handleLike}>
          👍
        </button>
        <div>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
