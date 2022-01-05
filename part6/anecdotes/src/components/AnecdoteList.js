import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { showNotification, hideNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`You voted '${content}'`))
    setTimeout(() => dispatch(hideNotification()), 2000)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes}</div>
      <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
      <br />
      <br />
    </div>
  ))
}

export default AnecdoteList
