import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from './../reducers/loginReducer'

const Menu = () => {
  const padding = { paddingRight: 5 }
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div style={{ backgroundColor: 'lightgrey', padding: 10 }}>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>

      <span>{currentUser.name} logged-in </span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Menu
