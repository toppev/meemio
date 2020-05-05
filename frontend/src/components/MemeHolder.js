import React from 'react'

const MemeHolder = ({ id, title, username, userId, changeFollow, active, follows }) =>
  <div className={`meme-holder ${active ? 'active' : ''}`} >
    <div className='media-holder'>
      <img src={`/media/${id}`} alt='well fuck' />
    </div>
    <div className='title-holder' onClick={() => changeFollow(userId, username)}>
      <h2>{title}</h2>
      <p>{follows ? 'unfollow' : 'follow'} {username}</p>
    </div>
  </div>

export { MemeHolder }