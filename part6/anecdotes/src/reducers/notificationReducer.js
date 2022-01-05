const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      return (state.notification = action.data.message)
    }
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

export default reducer
