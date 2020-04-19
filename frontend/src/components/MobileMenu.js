import React from 'react'

import { IoIosNotifications, IoIosHome, IoIosPerson, IoIosAddCircle, IoIosAdd } from 'react-icons/io'
import { Button } from './Button'

const MobileMenu = ({ route, pfp }) => {

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
        content={<IoIosAddCircle />}
        onClick={() => route('/create')}
        type='menu-element'
      />
      <Button
        content={pfp
          ? null
          : <IoIosPerson />}
        onClick={() => route('/profile')}
        type='menu-element'
      />
    </div>
  )
}

export { MobileMenu }