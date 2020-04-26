import React from 'react'


const NotificationView = (notifications) => {

  if (notifications[0]) {
    return (
      <div id='notification-container'>
        {notifications.map((n, i) => <div className='notification-alert' key={i} >{n.content}</div>)}
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