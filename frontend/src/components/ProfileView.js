import React from 'react'
import { FollowView } from './FollowView'

const ProfileView = ({ followers, following }) => {
  const handleSubmit = () => {
    e.preventDefault()
    
  }
  return (
    <div className='profile-view'>
      <form >
        <label >
          <input onChange={} type='file' />
          <h2 id='change-icon'>Change Icon</h2>
        </label>
      </form>
      <div id='a' className='profile-pane'>
        <h2>Following</h2>
        <FollowView people={following} />
      </div>
      <div id='b' className='profile-pane'>
        <h2>Followers</h2>
        <FollowView people={followers} />
      </div>
    </div>
  )
}

export { ProfileView }