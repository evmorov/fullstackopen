import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { showNotification, hideNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filterText = state.filter.trim()
    if (filterText === '') return state.anecdotes
    return state.anecdotes.filter((anecdote) => anecdote.content.includes(filterText))
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(hideNotification()), 2000)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes}</div>
      <button onClick={() => vote(anecdote)}>vote</button>
      <br />
      <br />
    </div>
  ))
}

export default AnecdoteList
