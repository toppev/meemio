import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { aviUpdateAction } from '../actions/userActions'
import { setNotification } from '../actions/notificationAction'
import { IoIosPerson } from 'react-icons/io'
import { FollowView } from './FollowView'


const ProfileView = ({ username, avi, changeFollow }) => {

  const dispatch = useDispatch()
  const { followers, following } = useSelector(state => state)

  const aviUpdate = formData => {
    try {
      dispatch(aviUpdateAction(formData))
      dispatch(setNotification('Profile picture updated', true))
    } catch (err) {
      console.error(err)
      dispatch(setNotification('There was an error updating your avatar', false))
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    aviUpdate(formData)
  }

  return (
    <div className='profile-view'>
      <form >
        <label >
          <input onChange={handleSubmit} type='file' />
          <div id='profile'>
            {avi
              ? <img src={`/media/${avi}`} alt='' />
              : <IoIosPerson />
            }
            <h2 id='change-icon'>{username}</h2>
          </div>
        </label>
      </form>
      <div id='a' className='profile-pane'>
        <h2>Following: {following.length}</h2>
        <FollowView following changeFollow={changeFollow} people={following} />
      </div>
      <div id='b' className='profile-pane'>
        <h2>Followers: {followers.length}</h2>
        <FollowView people={followers} />
      </div>
    </div>
  )
}

export { ProfileView }
