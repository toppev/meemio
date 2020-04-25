import React from 'react'
import { FollowView } from './FollowView'

const ProfileView = ({ followers, following, aviUpdate }) => {
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
