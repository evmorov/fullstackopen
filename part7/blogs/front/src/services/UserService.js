import axios from 'axios'

const USERS_BASE_URL = '/api/users'

export default class UserService {
  constructor(token) {
    this.token = token
  }

  authHeaders() {
    return {
      headers: { Authorization: `bearer ${this.token}` },
    }
  }

  async getAll() {
    const request = axios.get(USERS_BASE_URL, this.authHeaders())
    return request.then((response) => response.data)
  }
}
