import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { loginFromStorage, logout } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  useEffect(() => {
    dispatch(loginFromStorage())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {currentUser ? (
        <>
          <Menu />
          <h1>Blogs</h1>
          <div style={{ paddingBottom: 10 }}>
            <span>{currentUser.name} logged-in </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Notification />

          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/Blogs/:id">
              <Blog />
            </Route>
            <Route path="/">
              <Blogs />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <h1>Blogs</h1>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      )}
    </>
  )
}

export default App
