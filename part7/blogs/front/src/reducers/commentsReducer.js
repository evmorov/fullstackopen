import CommentService from './../services/CommentService'
import { getBlogs } from './blogsReducer'
import { showNotification } from './notificationReducer'

const initialState = {
  entryRespond: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_COMMENT': {
      const newComment = action.data
      return {
        ...initialState,
        entryRespond: newComment,
      }
    }
    default:
      return state
  }
}

export const createComment = (comment, blog) => {
  return async (dispatch, getState) => {
    const { token } = getState().currentUser
    try {
      const newComment = await new CommentService(token, blog).create(comment)
      dispatch({ type: 'CREATE_COMMENT', data: newComment })
      dispatch(getBlogs())
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
