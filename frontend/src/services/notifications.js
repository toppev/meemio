import axios from 'axios'

const baseUrl = '/notifications'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const readAll = async () => {
  const response = await axios.post(`${baseUrl}/read`)
  return response.data
}

const notificationService = {
  getAll,
  readAll
}

export { notificationService }