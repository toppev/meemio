const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return { ...state, message: '' }
    default:
      return state
  }
}

export { notificationReducer }