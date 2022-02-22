import BlogService from './../services/BlogService'
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

export const getBlogs = () => {
  return async (dispatch, getState) => {
    const { token } = getState().currentUser
    try {
      const blogs = await new BlogService(token).getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    } catch (exception) {
      handleException(exception, dispatch)
    }
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    const { token } = getState().currentUser
    try {
      const newBlog = await new BlogService(token).create(blog)
      dispatch({ type: 'CREATE_BLOG', data: newBlog })

      const message = `A new blog ${getState().blogs.entryRespond.title} created`
      dispatch(showNotification({ message: message, kind: 'success', seconds: 3 }))
    } catch (exception) {
      handleException(exception, dispatch)
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch, getState) => {
    const { token } = getState().currentUser
    try {
      const updatedBlog = await new BlogService(token).update(blog.id, blog)
      dispatch({ type: 'UPDATE_BLOG', data: updatedBlog })
    } catch (exception) {
      handleException(exception, dispatch)
    }
  }
}

export const destroyBlog = (blog) => {
  return async (dispatch, getState) => {
    const { token } = getState().currentUser
    try {
      await new BlogService(token).destroy(blog.id)
      dispatch({ type: 'DESTROY_BLOG', data: blog })

      const message = `Blog ${blog.title} has been removed`
      dispatch(showNotification({ message: message, kind: 'success', seconds: 3 }))
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
