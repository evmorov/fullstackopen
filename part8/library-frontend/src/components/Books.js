import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = ({ show }) => {
  const ALL = 'all'

  if (!show) {
    return null
  }

  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const { loading, data: { allBooks } = {} } = useQuery(ALL_BOOKS, { variables: { genre } })
  useEffect(() => {
    if (allBooks && genres.length === 0) {
      const genres = [null, ...new Set(allBooks.map((book) => book.genres).flat())]
      setGenres(genres)
    }
  }, [loading])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Books</h2>

      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g || ALL}
        </button>
      ))}

      <p>
        In genre <strong>{genre || ALL}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
          {allBooks.map((b) => (
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
