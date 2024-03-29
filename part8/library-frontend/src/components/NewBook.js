import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, CREATE_BOOK } from './queries'
import { updateBookCache } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateBookCache(cache, response.data.addBook, genres)
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const bookParams = { title, author, published, genres }
    const publishedInt = parseInt(published, 10) || 0
    createBook({ variables: { ...bookParams, published: publishedInt } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>New book</h2>

      <form onSubmit={submit}>
        <div>
          Title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type="submit">Create book</button>
      </form>
    </div>
  )
}

export default NewBook
