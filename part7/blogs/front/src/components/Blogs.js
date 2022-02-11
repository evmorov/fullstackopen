import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const toggleBlogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs.entries)

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Togglable
        showLabel="New blog"
        hideLabel="Cancel"
        hidePosition="bottom"
        ref={toggleBlogFormRef}
      >
        <BlogForm toggleBlogFormRef={toggleBlogFormRef} />
      </Togglable>

      <br />

      <h3>List</h3>
      <div data-test="blog-list">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default Blogs
