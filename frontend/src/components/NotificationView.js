import React, { useEffect } from 'react'

const NotificationView = ({ notifications, readAll }) => {
  useEffect(() => {
    readAll()
  }, [])
  if (notifications[0]) {
    return (
      <div id='notification-container'>
        {notifications.map((n, i) => <div className='notification-alert' key={i} >{n.message}</div>)}
      </div>
    )
  }
  return (
    <div >
      <h2>No new notifications</h2>
    </div>
  )
}

export { NotificationView }