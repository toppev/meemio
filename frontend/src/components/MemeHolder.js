import React from 'react'

const MemeHolder = ({ meme, title, userId, user, changeFollow }) => <div className='for-ani' >
  <div className='media-holder'>
    <img src={`/media/${meme}`} alt='well fuck' />
  </div>
  <div className='title-holder' onClick={() => changeFollow(userId)}>
    <h2>{title}</h2>
    <p>follow {user}</p>
  </div>
</div>
export { MemeHolder }