import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'

const Login = ({ loginSuccess, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      clearForm()
      const token = result.data.login.value
      loginSuccess(token)
    }
  }, [result.data])

  if (!show) return null

  const clearForm = () => {
    setUsername('')
    setPassword('')
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <div>
          Username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
