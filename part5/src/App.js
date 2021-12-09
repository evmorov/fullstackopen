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
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    showInfo('Successfully logged out')
  }

  const createBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      showInfo('Blog successfully created')
    } catch (exception) {
      showError(exception.response.data.error)
    }
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

  const blogForm = () => (
    <form onSubmit={createBlog}>
      <div>
        Title{' '}
        <input
          type="text"
          value={blogTitle}
          name="BlogTitle"
          autoComplete="blogtitle"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        Author{' '}
        <input
          type="text"
          value={blogAuthor}
          name="BlogAuthor"
          autoComplete="blogauthor"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        URL{' '}
        <input
          type="text"
          value={blogUrl}
          name="BlogUrl"
          autoComplete="blogurl"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <br />
      <div>
        <button type="submit">Create</button>
      </div>
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

          <h2>New blog</h2>
          {blogForm()}

          <br />
          <br />

          <table style={{ borderSpacing: '10px' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Url</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        loginForm()
      )}
    </div>
  )
}

export default App
