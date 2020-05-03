import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { followedReducer, followerReducer } from './followReducer'
import { notificationsReducer } from './notificationsReducer'
import { currentMemeReducer } from './currentMemeReducer'
import { notificationReducer } from './notificationReducer'

const index = combineReducers({
  user: userReducer,
  followers: followerReducer,
  following: followedReducer,
  notifications: notificationsReducer,
  memeIndex: currentMemeReducer,
  notification: notificationReducer
})

export default index