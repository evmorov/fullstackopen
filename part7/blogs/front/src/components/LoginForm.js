import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
        <div>
          Username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            autoComplete="username"
            data-test="username-input"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{' '}
          <input
            type="password"
            value={password}
            name="Password"
            autoComplete="current-password"
            data-test="password-input"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <button type="submit" data-test="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
