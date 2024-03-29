import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  
  return response.data
}

const update = async (id, blogToUpdate) => {
  const blogUrl = `${baseUrl}/${id}`
  
  const response = await axios.put(blogUrl, blogToUpdate)
  
  return response.data
} 

const remove = async (id, blog) => {
  const blogUrl = `${baseUrl}/${id}`

  const response = await axios.delete(blogUrl, {data: blog})

  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove }