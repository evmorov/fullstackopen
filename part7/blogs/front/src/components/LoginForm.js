import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { login } from './../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          autoComplete="username"
          data-test="username-input"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          autoComplete="current-password"
          data-test="password-input"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button
          variant="primary"
          style={{ marginTop: 10, marginBottom: 10 }}
          type="submit"
          data-test="login-button"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
