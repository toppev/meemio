const followerReducer = (state = [], action) => {
  switch (action.type) {
    case 'REMOVE_FOLLOWER':
      return state.filter(f => f.id !== action.payload)
    case 'ADD_FOLLOWER':
      return [...state, action.payload]
    case 'INIT_FOLLOWERS':
      return action.payload
    default:
      return state
  }
}

const followedReducer = (state = [], action) => {
  switch (action.type) {
    case 'REMOVE_FOLLOWED':
      return state.filter(f => f.id !== action.payload)
    case 'ADD_FOLLOWED':
      return [...state, action.payload]
    case 'INIT_FOLLOWING':
      return action.payload
    default:
      return state
  }
}

export { followedReducer, followerReducer }