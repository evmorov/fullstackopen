import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject, onNonAuthorized) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config).catch((error) => {
    if (error.response.status === 401) onNonAuthorized()
    throw error
  })
  return response.data
}

const update = async (id, updateObject, onNonAuthorized) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updateObject, config).catch((error) => {
    if (error.response.status === 401) onNonAuthorized()
    throw error
  })
  return response.data
}

const exportedObject = {
  setToken,
  getAll,
  create,
  update,
}

export default exportedObject
