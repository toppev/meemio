import axios from 'axios'

const baseUrl = 'http://localhost:3001/memes'
const realUrl = '/post'

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