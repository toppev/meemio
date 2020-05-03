import { notificationService } from "../services/notifications"

const getNotifications = () => {
  return async dispatch => {
    const notifications = await notificationService.getAll()
    console.log('from action', notifications)
    dispatch({
      type: 'INIT_NOTIFICATIONS',
      payload: notifications
    })
  }
}
const readNotifications = () => {
  notificationService.readAll()
  return {
    type: 'READ_ALL'
  }
}

export { getNotifications, readNotifications }