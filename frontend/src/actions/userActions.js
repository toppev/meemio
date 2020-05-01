import { memeService } from '../services/memes'

const initUser = user => {
  console.log('Setting user', user)
  return {
    type: 'INIT_USER',
    payload: user
  }
}

const addMeme = formData => {
  return async dispatch => {
    const newMeme = await memeService.uploadMeme(formData)
    dispatch({
      type: 'ADD_MEME',
      payload: newMeme
    })
  }
}

const addLiked = id => {
  memeService.like(id)
  return {
    type: 'LIKE',
    payload: id
  }
}

const addDisliked = id => {
  memeService.dislike(id)
  return {
    type: 'DISLIKE',
    payload: id
  }
}

export { initUser, addMeme, addLiked, addDisliked }