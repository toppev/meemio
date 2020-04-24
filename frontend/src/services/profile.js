import axios from 'axios'

const baseUrl = 'http://localhost:3001/people'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const profileService = {
  getAll
}

export { profileService }