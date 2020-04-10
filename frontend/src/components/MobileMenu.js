import React from 'react'

import { IoIosNotifications, IoIosHome, IoIosPerson } from 'react-icons/io'
import { Button } from './Button'

const MobileMenu = ({ route }) => {

  return (
    <div className='mobile-specific' id='mobile-navbar'>
      <Button
        content={<IoIosNotifications />}
        onClick={() => route('/notifications')}
        type='menu-element'
      />
      <Button
        content={<IoIosHome />}
        onClick={() => route('/')}
        type='menu-element'
      />
      <Button
        content={<IoIosPerson />}
        onClick={() => route('/profile')}
        type='menu-element'
      />
    </div>
  )
}

export { MobileMenu }