import anecdoteService from './../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const { id, votes } = action.data
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes }
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
    }
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    })
  }
}

export default reducer
