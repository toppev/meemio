import React from 'react'

import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import { Button } from './Button'

const ContentWrapper = ({ meme, title, like, dislike, user, changeFollow }) => {

  return (
    <div className='content-wrapper' >
      <div className='media-holder'>
        <img src={`/media/${meme}`} alt='well fuck' />
      </div>
      <div onClick={changeFollow}>
        <h2>{title}</h2>
        <p>Follow creator: {user}</p>
      </div>
      <div className='mobile-specific'>
        <Button onClick={like} type='btn-like' content={<IoIosThumbsUp />} />
        <Button onClick={dislike} type='btn-dislike' content={<IoIosThumbsDown />} />
      </div>
    </div>
  )

}

export { ContentWrapper }