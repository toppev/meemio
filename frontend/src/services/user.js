import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const baseUrl = '/user'

const multipartConf = {
  headers: {
    'content-type': 'multipart/form-data'
  }
}

const login = async (username, password) => {
  console.log('login being called')
  try {
    const response = await axios.get(`${baseUrl}/login`, {
      withCredentials: true,
      auth: {
        username,
        password
      }
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const follow = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/follow`)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}s/${id}`)
  return response.data
}

const unfollow = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/unfollow`)
  return response.data
}
const getFollowers = async (id) => {
  const response = await axios.get(`${baseUrl}s/${id}/followers`)
  return response.data
}
const getFollowing = async (id) => {
  const response = await axios.get(`${baseUrl}s/${id}/following`)
  return response.data
}

const register = async (username, password) => {
  const response = await axios.post(`${baseUrl}/register`, {
    username,
    password
  })
  return response.data
}

const aviUpdate = async (formData) => {
  const response = await axios.post(`${baseUrl}/avatar`, formData, multipartConf)
  return response.data
}

const userService = {
  login,
  register,
  aviUpdate,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  getUser
}

export { userService }