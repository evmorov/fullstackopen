import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { logout } from './../reducers/loginReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar collapseOnSelect bg="light" expand="lg">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>{currentUser.name} logged-in</Navbar.Text>
        <Button onClick={handleLogout} variant="light">
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
