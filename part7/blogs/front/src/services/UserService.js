import axios from 'axios'

const USERS_BASE_URL = '/api/users'

export default class UserService {
  async getAll() {
    const request = axios.get(USERS_BASE_URL)
    return request.then((response) => response.data)
  }
}
