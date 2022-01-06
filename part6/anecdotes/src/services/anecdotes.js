import axios from 'axios'

const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async ({ id, votes }) => {
  const response = await axios.patch(`${baseUrl}/${id}`, { votes: votes + 1 })
  return response.data
}

export default { getAll, createNew, vote }
