import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { showNotification, hideNotification } from './../reducers/notificationReducer'
import anecdoteService from './../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(showNotification(`Anecdote '${content}' is created`))
    setTimeout(() => dispatch(hideNotification()), 2000)
  }

  return (
    <div>
      <h2>Add</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
