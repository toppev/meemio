import { userService } from '../services/user'

const followAction = id => {
  return async dispatch => {
    userService.follow(id)
    const justFollowed = await userService.getUser(id)
    dispatch({
      type: 'ADD_FOLLOWED',
      payload: justFollowed
    })
  }
}

const unfollowAction = id => {
  userService.unfollow(id)
  return {
    type: 'REMOVE_FOLLOWED',
    payload: id
  }
}

const initFollowers = userID => {
  return async dispatch => {
    const followers = await userService.getFollowers(userID)
    dispatch({
      type: 'INIT_FOLLOWERS',
      payload: followers._embedded.users
    })
  }
}

const initFollowing = userID => {
  return async dispatch => {
    const following = await userService.getFollowing(userID)
    dispatch({
      type: 'INIT_FOLLOWING',
      payload: following._embedded.users
    })
  }
}
export { followAction, unfollowAction, initFollowers, initFollowing }