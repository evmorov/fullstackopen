import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const container = render(<BlogForm createBlog={createBlog} />).container

  const titleInput = container.querySelector('[data-test="blog-title-input"]')
  const authorInput = container.querySelector('[data-test="blog-author-input"]')
  const urlInput = container.querySelector('[data-test="blog-url-input"]')
  const form = container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'TestTitle' } })
  fireEvent.change(authorInput, { target: { value: 'TestAuthor' } })
  fireEvent.change(urlInput, { target: { value: 'TestUrl' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toMatchObject({
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
  })
})
