import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const baseUrl = '/post'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const uploadMeme = (meme) => {

}

const memeService = {
  getAll
}

export { memeService }