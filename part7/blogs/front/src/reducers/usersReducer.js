import UserService from './../services/UserService'

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
  return async (dispatch) => {
    const users = await new UserService().getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default reducer
