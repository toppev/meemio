const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.payload
    case 'ADD_MEME':
      return { ...state, posts: [...(state.posts || []), action.payload] }
    case 'LIKE':
      return { ...state, likes: [...(state.likes || []), action.payload] }
    case 'DISLIKE':
      return { ...state, dislikes: [...(state.dislikes || []), action.payload] }
    case 'AVI_UPDATE':
      return { ...state, avatar: action.payload }
    default:
      return state
  }
}
export { userReducer }