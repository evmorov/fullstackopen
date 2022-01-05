const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return (state = action.data.message)
    case 'HIDE_NOTIFICATION':
      return (state = initialState)
    default:
      return state
  }
}

export const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message },
  }
}

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' }
}

export default reducer
