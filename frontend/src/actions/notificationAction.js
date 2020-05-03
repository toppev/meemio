let timeoutId

const setNotification = (message, successful, time = 3000) => {
  return dispatch => {
    dispatch({
      type: 'SHOW',
      payload: {
        message,
        successful
      }
    })
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, time)
    } else {
      timeoutId = setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, time)
    }
  }
}

export { setNotification }