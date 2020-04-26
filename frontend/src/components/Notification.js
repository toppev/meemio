import React from 'react'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io'

const Notification = ({ success, message }) => {

  const classname = success
    ? 'success'
    : 'error'

  const icon = success
    ? <IoIosCheckmarkCircle />
    : <IoIosCloseCircle />

  return (
    <div className={`notification ${classname}`} >
      <div className='check-circle-container'>
        {icon}
      </div>
      <p className='notification-text'>
        {message}
      </p>
    </div >
  )
}

export { Notification }