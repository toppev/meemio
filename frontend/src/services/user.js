import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const baseUrl = '/user'

const login = async (username, password) => {
  console.log('login being called')
  const response = await axios.get(`${baseUrl}/login`, {
    withCredentials: true,
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