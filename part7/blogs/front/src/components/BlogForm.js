import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createBlog } from './../reducers/blogsReducer'

const BlogForm = ({ toggleBlogFormRef }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const dispatch = useDispatch()
  const blogRespond = useSelector((state) => state.blogs.entryRespond)

  useEffect(() => {
    clearForm()
    toggleBlogFormRef.current.hide()
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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={blogTitle}
            name="BlogTitle"
            autoComplete="blogtitle"
            data-test="blog-title-input"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={blogAuthor}
            name="BlogAuthor"
            autoComplete="blogauthor"
            data-test="blog-author-input"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={blogUrl}
            name="BlogUrl"
            autoComplete="blogurl"
            data-test="blog-url-input"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: 10, marginBottom: 10 }}
            data-test="blog-create-button"
          >
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
