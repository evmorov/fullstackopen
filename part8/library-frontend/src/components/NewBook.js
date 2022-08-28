import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from './queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      const allGenre = null
      genres.concat(allGenre).forEach((genre) => {
        cache.updateQuery({ query: ALL_BOOKS, variables: { genre: genre } }, (cacheResult) => {
          if (!cacheResult) return
          const newBook = response.data.addBook
          const allBooksUpdated = cacheResult.allBooks.concat(newBook)
          return { allBooks: allBooksUpdated }
        })
      })
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
