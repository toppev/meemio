import React from 'react'

import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import { Button } from './Button'

const ContentWrapper = ({ meme, title, like, dislike, user, changeFollow, userId }) => {
  return (
    <div className='content-wrapper' >
      <div className='media-holder'>
        <img src={`/media/${meme}`} alt='well fuck' />
      </div>
      <div className='title-holder' onClick={() => changeFollow(userId)}>
        <h2>{title}</h2>
        <p>follow {user}</p>
      </div>
      <div className='mobile-specific'>
        <Button onClick={like} type='btn-like' content={<IoIosThumbsUp />} />
        <Button onClick={dislike} type='btn-dislike' content={<IoIosThumbsDown />} />
      </div>
    </div>
  )

}

export { ContentWrapper }