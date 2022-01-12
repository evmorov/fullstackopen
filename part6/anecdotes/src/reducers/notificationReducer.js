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

let lastTimeout = null

export const showNotification = (message, seconds) => {
  return async (dispatch) => {
    clearTimeout(lastTimeout)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message,
    })
    lastTimeout = setTimeout(() => dispatch(hideNotification()), seconds * 1000)
  }
}

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' }
}

export default reducer
