import axios from 'axios'

const BLOGS_BASE_URL = '/api/blogs'

export default class BlogService {
  constructor(token) {
    this.token = token
  }

  authHeaders() {
    return {
      headers: { Authorization: `bearer ${this.token}` },
    }
  }

  async getAll() {
    const request = axios.get(BLOGS_BASE_URL)
    return request.then((response) => response.data)
  }

  async create(newObject) {
    const response = await axios.post(BLOGS_BASE_URL, newObject, this.authHeaders())
    return response.data
  }

  async update(id, updateObject) {
    const response = await axios.put(`${BLOGS_BASE_URL}/${id}`, updateObject, this.authHeaders())
    return response.data
  }

  async destroy(id) {
    const response = await axios.delete(`${BLOGS_BASE_URL}/${id}`, this.authHeaders())
    return response.data
  }
}
