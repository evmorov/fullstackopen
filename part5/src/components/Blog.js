import React, { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog: { title, author, url, likes }, blog, updateBlog }) => {
  const toggleDetailsRef = useRef()

  const likeButtonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  }

  const editBlog = (event) => {
    event.preventDefault()
    const editedBlog = { ...blog, likes: likes + 1 }

    updateBlog(editedBlog)
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <span>{title}</span>{' '}
      <Togglable showLabel="view" hideLabel="hide" ref={toggleDetailsRef}>
        <div>{author}</div>
        <div>{url}</div>
        <span>Likes: {likes}</span>
        <button style={likeButtonStyle} onClick={editBlog}>
          👍
        </button>
        <br />
      </Togglable>
    </div>
  )
}

export default Blog
