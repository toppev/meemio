import React from 'react'

import { IoIosNotifications, IoIosHome, IoIosPerson, IoIosAddCircle, IoIosNotificationsOutline } from 'react-icons/io'
import { Button } from './Button'

const MobileMenu = ({ route, unread }) => {

  return (
    <div className='mobile-specific' id='mobile-navbar'>
      <Button
        content={unread ? <IoIosNotifications /> : <IoIosNotificationsOutline />}
        onClick={() => route('/notifications')}
        type='menu-element notif-route-btn'
      />
      <Button
        content={<IoIosHome />}
        onClick={() => route('/home')}
        type='menu-element home-route-btn'
      />
      <Button
        content={<IoIosAddCircle />}
        onClick={() => route('/create')}
        type='menu-element create-route-btn'
      />
      <Button
        content={<IoIosPerson />}
        onClick={() => route('/profile')}
        type='menu-element profile-route-btn'
      />
    </div>
  )
}

export { MobileMenu }