import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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

      <h2>List</h2>
      <div data-test="blog-list">
        {sortedBlogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div>
              {blog.title}, {blog.author}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blogs
