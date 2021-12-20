import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('render', () => {
  let component = null

  const title = 'TestTitle'
  const author = 'TestAuthor'
  const url = 'TestURL'
  const likes = 357
  const userName = 'TestUsername'

  beforeEach(() => {
    const blog = {
      title,
      author,
      url,
      likes,
      user: {
        name: userName,
      },
    }
    component = render(<Blog blog={blog} />)
  })

  test('title and author', () => {
    const elem = component.container.querySelector('[data-test="blog-main"]')
    expect(elem.textContent).toEqual(`${title}, ${author}`)
    expect(elem).toBeVisible()
  })

  test('URL, likes and owner are invisible', () => {
    const elem = component.container.querySelector('[data-test="blog-extra"]')
    expect(elem.textContent).toEqual(`${url}Likes: ${likes}👍Owner: ${userName}`)
    expect(elem).not.toBeVisible()
  })
})
