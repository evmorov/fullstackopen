import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes}</div>
      <button onClick={() => vote(anecdote.id)}>vote</button>
      <br />
      <br />
    </div>
  ))
}

export default AnecdoteList
