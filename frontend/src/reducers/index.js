import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { followedReducer, followerReducer } from './followReducer'
import { notificationsReducer } from './notificationsReducer'

const index = combineReducers({
  user: userReducer,
  followers: followerReducer,
  following: followedReducer,
  notifications: notificationsReducer
})

export default index