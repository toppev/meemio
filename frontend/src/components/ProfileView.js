import React from 'react'
import { IoIosPerson } from 'react-icons/io'
import { FollowView } from './FollowView'

const ProfileView = ({ followers, following, aviUpdate, username, avi, changeFollow }) => {
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
            <h2 id='change-icon'>{username}</h2>
            {avi
              ? <img src={`/media/${avi}`} alt='' />
              : <IoIosPerson />
            }
          </div>
        </label>
      </form>
      <div id='a' className='profile-pane'>
        <h2>Following</h2>
        <FollowView following changeFollow={changeFollow} people={following} />
      </div>
      <div id='b' className='profile-pane'>
        <h2>Followers</h2>
        <FollowView people={followers} />
      </div>
    </div>
  )
}

export { ProfileView }
