import React from 'react'
const Blog = ({ blog: { title, author, url } }) => (
  <tr>
    <td>{title}</td>
    <td>{author}</td>
    <td>{url}</td>
  </tr>
)

export default Blog
