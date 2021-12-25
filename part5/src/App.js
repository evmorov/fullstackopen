import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState({})
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const toggleBlogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
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
    setNotification({ message, type: 'info' })
    setTimeout(() => setNotification({}), 3000)
  }

  const showError = (message) => {
    setNotification({ message, type: 'error' })
    setTimeout(() => setNotification({}), 4000)
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

  const createBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      showInfo(`A new blog ${returnedBlog.title} created`)
      blogFormRef.current.clearForm()
      toggleBlogFormRef.current.toggleVisibility()
    } catch (exception) {
      exception.response ? showError(exception.response.data.error) : console.error(exception)
    }
  }

  const updateBlog = async (blog) => {
    const id = blog.id
    try {
      const returnedBlog = await blogService.update(id, blog)
      setBlogs(blogs.map((b) => (b.id === id ? returnedBlog : b)))
    } catch (exception) {
      exception.response ? showError(exception.response.data.error) : console.error(exception)
    }
  }

  const destroyBlog = async (blog) => {
    const id = blog.id
    try {
      await blogService.destroy(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      showInfo(`Blog ${blog.title} has been removed`)
    } catch (exception) {
      exception.response ? showError(exception.response.data.error) : console.error(exception)
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {user ? <h2>Blogs</h2> : <h2>Log in to application</h2>}

      <Notification notification={notification} />

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
            <BlogForm createBlog={createBlog} ref={blogFormRef} />
          </Togglable>

          <br />

          <h3>List</h3>
          <div data-test="blog-list">
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} destroyBlog={destroyBlog} />
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
