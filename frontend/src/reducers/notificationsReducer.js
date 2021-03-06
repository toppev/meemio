const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'READ_ALL':
      return state.map(n => ({ ...n, hasRead: true }))
    case 'INIT_NOTIFICATIONS':
      return action.payload
    default:
      return state
  }
}

export { notificationsReducer }