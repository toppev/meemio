import axios from 'axios'

const baseUrl = 'http://localhost:3001/notifications'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const notificationService = {
  getAll
}

export { notificationService }