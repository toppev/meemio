import React from 'react'

const MemeHolder = ({ id, title, username, userId, changeFollow, active }) =>
  <div className={`memo-holder ${active ? 'active' : ''}`} >
    <div className='media-holder'>
      <img src={`/media/${id}`} alt='well fuck' />
    </div>
    <div className='title-holder' onClick={() => changeFollow(userId)}>
      <h2>{title}</h2>
      <p>follow {username}</p>
    </div>
  </div>

export { MemeHolder }