import axios from 'axios'

const COMMENTS_BASE_URL = '/api/blogs/:blogId/comments'

export default class CommentService {
  constructor(token, blog) {
    this.blog = blog
    this.url = COMMENTS_BASE_URL.replace(':blogId', blog.id)
    this.token = token
  }

  authHeaders() {
    return {
      headers: { Authorization: `bearer ${this.token}` },
    }
  }

  async create(newObject) {
    const response = await axios.post(this.url, newObject, this.authHeaders())
    return response.data
  }
}
