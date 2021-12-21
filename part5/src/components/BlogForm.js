import React, { useState, useImperativeHandle } from 'react'

const BlogForm = React.forwardRef(({ createBlog }, ref) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })
  }

  const clearForm = () => {
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  useImperativeHandle(ref, () => {
    return {
      clearForm,
    }
  })

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
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm
