const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.message
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const showNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message,
    })
    setTimeout(() => dispatch(hideNotification()), seconds * 1000)
  }
}

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' }
}

export default reducer
