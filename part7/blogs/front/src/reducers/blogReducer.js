import blogService from './../services/blogs'
import { showNotification } from './notificationReducer'

const initialState = {
  entries: [],
  entryRespond: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_BLOG': {
      const newBlog = action.data
      return {
        ...initialState,
        entries: [...state.entries, newBlog],
        entryRespond: newBlog,
      }
    }
    case 'INIT_BLOGS': {
      const entries = action.data
      return { ...initialState, entries }
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({ type: 'NEW_BLOG', data: newBlog })

      const message = `A new blog ${getState().blogs.entryRespond.title} created`
      dispatch(showNotification({ message: message, kind: 'info', seconds: 3 }))
    } catch (exception) {
      if (exception.response) {
        const message = exception.response.data.error
        dispatch(showNotification({ message: message, kind: 'error', seconds: 4 }))
      } else {
        console.error(exception)
      }
    }
  }
}

export default reducer
