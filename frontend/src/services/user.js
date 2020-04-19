import axios from 'axios'

const baseUrl = '/user'

const login = async (username, password) => {
  const response = await axios.get(`${baseUrl}/login`, {
    auth: {
      username,
      password
    }
  })
  return response.data
}

const userService = {
  login
}

export { userService }