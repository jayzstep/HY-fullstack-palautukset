import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, blogToUpdate) => {
  const blogUrl = `${baseUrl}/${id}`

  const response = await axios.put(blogUrl, blogToUpdate)

  return response.data
}
const remove = async (id) => {
  const blogUrl = `${baseUrl}/${id}`

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(blogUrl, config)

  return response.data
}

const addBlogComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

export default { setToken, getAll, create, update, remove, addBlogComment }
