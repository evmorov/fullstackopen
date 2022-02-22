import UserService from './../services/UserService'
import { showNotification } from './notificationReducer'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const getUsers = () => {
  return async (dispatch, getState) => {
    const { token } = getState().currentUser
    try {
      const users = await new UserService(token).getAll()
      dispatch({
        type: 'INIT_USERS',
        data: users,
      })
    } catch (exception) {
      handleException(exception, dispatch)
    }
  }
}

const handleException = (exception, dispatch) => {
  if (exception.response) {
    const message = exception.response.data.error
    dispatch(showNotification({ message: message, kind: 'danger', seconds: 4 }))
  } else {
    console.error(exception)
  }
}

export default reducer
