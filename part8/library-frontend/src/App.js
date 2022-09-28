import React, { useEffect, useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'
import { ALL_BOOKS, BOOK_ADDED } from './components/queries'

export const updateBookCache = (cache, addedBook, genres) => {
  const uniqByTitle = (books) => {
    let seen = new Set()
    return books.filter(({ title }) => {
      return seen.has(title) ? false : seen.add(title)
    })
  }

  const allGenre = null
  genres.concat(allGenre).forEach((genre) => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, (cacheResult) => {
      if (!cacheResult) return
      const allBooksUpdated = uniqByTitle(cacheResult.allBooks.concat(addedBook))
      return { allBooks: allBooksUpdated }
    })
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    setToken(token)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateBookCache(client.cache, addedBook, addedBook.genres)
    },
  })

  const loginSuccess = (token) => {
    setToken(token)
    localStorage.setItem('user-token', token)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token ? (
          <>
            <button onClick={() => setPage('recommend')}>Recommend</button>
            <button onClick={() => setPage('add')}>Add book</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Authors show={page === 'authors'} loggedIn={!!token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} />
      <Login show={page === 'login'} loginSuccess={loginSuccess} />
    </div>
  )
}

export default App
