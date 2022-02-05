import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const toggleBlogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs.entries)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showInfo = (message) => {
    dispatch(showNotification({ message: message, kind: 'info', seconds: 3 }))
  }

  const showError = (message) => {
    dispatch(showNotification({ message: message, kind: 'error', seconds: 4 }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      showInfo('Successfully logged in')
    } catch (exception) {
      showError('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogFormRef.current && blogFormRef.current.clearForm()
    showInfo('Successfully logged out')
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
            <BlogForm ref={blogFormRef} toggleBlogFormRef={toggleBlogFormRef} />
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
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      )}
    </div>
  )
}

export default App
