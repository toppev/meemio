import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const baseUrl = '/post'

const multipartConf = {
  headers: {
    'content-type': 'multipart/form-data'
  }
}

const getMemes = async () => {
  const response = await axios.get(`${baseUrl}/next`, { withCredentials: true })
  return response.data
}

const uploadMeme = async (meme) => {
  const response = await axios.post(`${baseUrl}/upload`, meme, multipartConf)
  return response.data
}

const getMedia = async (id) => {
  const response = await axios.get(`/media/${id}`)
  return response.data
}

const like = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/like`)
  return response.data
}

const dislike = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/dislike`)
  return response.data
}

const memeService = {
  getMemes,
  uploadMeme,
  getMedia,
  like,
  dislike
}

export { memeService, uploadMeme, getMemes }