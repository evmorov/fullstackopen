import blogService from './../services/blogs'
import { showNotification } from './notificationReducer'

const initialState = {
  entries: [],
  entryRespond: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      const entries = action.data
      return { ...initialState, entries }
    }
    case 'CREATE_BLOG': {
      const newBlog = action.data
      return {
        ...initialState,
        entries: [...state.entries, newBlog],
        entryRespond: newBlog,
      }
    }
    case 'UPDATE_BLOG': {
      const updatedBlog = action.data
      return {
        ...initialState,
        entries: state.entries.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      }
    }
    case 'DESTROY_BLOG': {
      const destroyedBlog = action.data
      return {
        ...initialState,
        entries: state.entries.filter((blog) => blog.id !== destroyedBlog.id),
      }
    }
    case 'LOGOUT':
      return initialState
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
      dispatch({ type: 'CREATE_BLOG', data: newBlog })

      const message = `A new blog ${getState().blogs.entryRespond.title} created`
      dispatch(showNotification({ message: message, kind: 'info', seconds: 3 }))
    } catch (exception) {
      handleException(exception, dispatch)
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      dispatch({ type: 'UPDATE_BLOG', data: updatedBlog })
    } catch (exception) {
      handleException(exception, dispatch)
    }
  }
}

export const destroyBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.destroy(blog.id)
      dispatch({ type: 'DESTROY_BLOG', data: blog })

      const message = `Blog ${blog.title} has been removed`
      dispatch(showNotification({ message: message, kind: 'info', seconds: 3 }))
    } catch (exception) {
      handleException(exception, dispatch)
    }
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
