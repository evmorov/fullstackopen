import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
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
            onChange={handleUsernameChange}
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
            onChange={handlePasswordChange}
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
