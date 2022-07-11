import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from './queries'

const Recommend = ({ show }) => {
  if (!show) {
    return null
  }

  const allBooksResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)

  if (allBooksResult.loading || meResult.loading) {
    return <div>Loading...</div>
  }

  const books = allBooksResult.data.allBooks
  const genre = meResult.data.me.favoriteGenre

  return (
    <div>
      <h2>Recommendation</h2>

      <p>
        Books in your favorite genre <strong>{genre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
          {books
            .filter((b) => b.genres.includes(genre))
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

export default Recommend
