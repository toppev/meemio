import React from 'react'

import { IoIosNotifications, IoIosHome, IoIosPerson, IoIosAddCircle } from 'react-icons/io'
import { Button } from './Button'

const MobileMenu = ({ route, pfp }) => {

  return (
    <div className='mobile-specific' id='mobile-navbar'>
      <Button
        content={<IoIosNotifications />}
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
        content={pfp
          ? null
          : <IoIosPerson />}
        onClick={() => route('/profile')}
        type='menu-element profile-route-btn'
      />
    </div>
  )
}

export { MobileMenu }