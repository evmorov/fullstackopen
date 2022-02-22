import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const toggleBlogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs.entries)

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Togglable
          showLabel="New blog"
          hideLabel="Cancel"
          hidePosition="bottom"
          ref={toggleBlogFormRef}
        >
          <BlogForm toggleBlogFormRef={toggleBlogFormRef} />
        </Togglable>
      </div>

      <h2>List</h2>
      <Table striped hover data-test="blog-list">
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td className="text-end">{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
