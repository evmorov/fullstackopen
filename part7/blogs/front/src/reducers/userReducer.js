import loginService from './../services/login'
import { showNotification } from './notificationReducer'
import { initializeBlogs } from './blogReducer'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch({ type: 'LOGIN', data: user })
      dispatch(initializeBlogs())
      dispatch(showNotification({ message: 'Successfully logged in', kind: 'info', seconds: 3 }))
    } catch (exception) {
      handleException(exception, dispatch)
    }
  }
}

export const loginFromStorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOGIN', data: user })
      dispatch(initializeBlogs())
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch({ type: 'LOGOUT' })
    dispatch(showNotification({ message: 'Successfully logged out', kind: 'info', seconds: 3 }))
  }
}

const handleException = (exception, dispatch) => {
  if (exception.response) {
    const message = exception.response.data.error
    dispatch(showNotification({ message: message, kind: 'error', seconds: 4 }))
  } else {
    console.error(exception)
  }
}

export default reducer
