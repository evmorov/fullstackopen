import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('render', () => {
  let container = null

  const title = 'TestTitle'
  const author = 'TestAuthor'
  const url = 'TestURL'
  const likes = 357
  const userName = 'TestUsername'

  const blogMain = `${title}, ${author}`
  const blogExtra = `${url}Likes: ${likes}👍Owner: ${userName}`

  beforeEach(() => {
    const blog = { title, author, url, likes, user: { name: userName } }
    container = render(<Blog blog={blog} />).container
  })

  test('title and author are visible', () => {
    const elem = container.querySelector('[data-test="blog-main"]')
    expect(elem.textContent).toEqual(blogMain)
    expect(elem).toBeVisible()
  })

  test('URL, likes and owner are invisible', () => {
    const elem = container.querySelector('[data-test="blog-extra"]')
    expect(elem.textContent).toEqual(blogExtra)
    expect(elem).not.toBeVisible()
  })

  describe('when the button controlling the shown details has been clicked', () => {
    beforeEach(() => {
      const button = container.querySelector('[data-test="toggle-button"]')
      fireEvent.click(button)
    })

    test('URL, likes and owner are visible', () => {
      const elem = container.querySelector('[data-test="blog-extra"]')
      expect(elem.textContent).toEqual(blogExtra)
      expect(elem).toBeVisible()
    })
  })
})
