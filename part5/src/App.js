import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState({})
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    showInfo('Successfully logged out')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          autoComplete="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="current-password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

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

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        loginForm()
      )}
    </div>
  )
}

export default App
