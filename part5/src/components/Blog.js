import React, { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog: { title, author, url } }) => {
  const toggleDetailsRef = useRef()

  return (
    <div style={{ marginBottom: 10 }}>
      <span>{title}</span>
      {' '}
      <Togglable showLabel="view" hideLabel="hide" ref={toggleDetailsRef}>
        <div>{author}</div>
        <div>{url}</div>
      </Togglable>
    </div>
  )
}

export default Blog
