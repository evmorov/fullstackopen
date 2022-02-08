const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return initialState
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

let lastTimeout = null

export const showNotification = ({ message, kind, seconds }) => {
  return async (dispatch) => {
    clearTimeout(lastTimeout)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: { message, kind },
    })
    lastTimeout = setTimeout(() => dispatch(hideNotification()), seconds * 1000)
  }
}

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' }
}

export default reducer
