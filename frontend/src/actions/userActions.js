import { memeService } from '../services/memes'
import { userService } from '../services/user'

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

const aviUpdateAction = formData => {
  return async dispatch => {
    const newAvi = await userService.aviUpdate(formData)
    console.log('in dispatch', newAvi)
    dispatch({
      type: 'AVI_UPDATE',
      payload: newAvi
    })
  }
}

export { initUser, addMeme, addLiked, addDisliked, aviUpdateAction }