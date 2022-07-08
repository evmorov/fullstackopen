import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = ({ show }) => {
  const ALL = 'all'

  if (!show) {
    return null
  }

  const [genre, setGenre] = useState(ALL)
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks
  const genres = [ALL, ...new Set(books.map((book) => book.genres).flat())]

  return (
    <div>
      <h2>Books</h2>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}

      <div>
        In genre <strong>{genre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
          {books
            .filter((b) => (genre !== ALL ? b.genres.includes(genre) : b))
            .map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                <td>{b.genres.join(', ')}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
