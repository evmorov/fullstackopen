import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from './../reducers/blogsReducer'

const BlogForm = ({ toggleBlogFormRef }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const dispatch = useDispatch()
  const blogRespond = useSelector((state) => state.blogs.entryRespond)

  useEffect(() => {
    if (!blogRespond) return
    clearForm()
    toggleBlogFormRef.current.toggleVisibility()
  }, [blogRespond])

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      }),
    )
  }

  const clearForm = () => {
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h3>New blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title{' '}
          <input
            type="text"
            value={blogTitle}
            name="BlogTitle"
            autoComplete="blogtitle"
            data-test="blog-title-input"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author{' '}
          <input
            type="text"
            value={blogAuthor}
            name="BlogAuthor"
            autoComplete="blogauthor"
            data-test="blog-author-input"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL{' '}
          <input
            type="text"
            value={blogUrl}
            name="BlogUrl"
            autoComplete="blogurl"
            data-test="blog-url-input"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <br />
        <div>
          <button type="submit" data-test="blog-create-button">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
