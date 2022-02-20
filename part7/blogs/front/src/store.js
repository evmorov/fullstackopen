import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import commentsReducer from './reducers/commentsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  currentUser: loginReducer,
  users: usersReducer,
  comments: commentsReducer,
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
