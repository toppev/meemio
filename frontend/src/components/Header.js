import React from 'react'
import { IoIosSettings } from 'react-icons/io'

import { Button } from './Button'

const Header = () => {

  return (
    <div id='header'>
      <div className='space-holder' ></div>
      <h1 id='app-title'>Meemio</h1>
      <Button type='btn-settings' content={<IoIosSettings />} />

      {/* <div id='settings-btn-container'>
        <Button type='btn-settings' content={<IoIosSettings />} />
      </div> */}
    </div>
  )
}

export { Header }