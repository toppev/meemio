import { notificationService } from "../services/notifications"

const getNotifications = () => {
  return {
    type: 'INIT_NOTIFICATIONS'
  }
}
const readNotifications = () => {
  notificationService.readAll()
  return {
    type: 'READ_ALL'
  }
}

export { getNotifications, readNotifications }