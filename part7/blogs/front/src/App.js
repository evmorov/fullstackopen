import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { loginFromStorage, logout } from './reducers/userReducer'

const App = () => {
  const toggleBlogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs.entries)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(loginFromStorage())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {user ? <h2>Blogs</h2> : <h2>Log in to application</h2>}

      <Notification />

      {user ? (
        <div>
          <span>{user.name} logged-in </span>
          <button onClick={handleLogout}>Logout</button>

          <br />
          <br />

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
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
