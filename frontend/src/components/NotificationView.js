import React, { useState, useEffect } from 'react'

import { notificationService } from '../services/notifications'

const NotificationView = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    notificationService.getAll()
      .then(res => setNotifications(res))
  }, [])

  return (
    <div id='notification-container'>
      {notifications.map((n, i) => <div className='notification' key={i} >{n.content}</div>)}
    </div>
  )
}

export { NotificationView }