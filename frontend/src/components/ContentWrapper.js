import React from 'react'

import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import { Button } from './Button'

const ContentWrapper = ({ meme, title, like, dislike }) => {

  return (
    <div id='content-wrapper' >
      <div id='media-holder'>
        <img src={meme} alt='well fuck' />
      </div>
      <h2>{title}</h2>
      <div className='mobile-specific'>
        <Button onClick={like} type='btn-like' content={<IoIosThumbsUp />} />
        <Button onClick={dislike} type='btn-dislike' content={<IoIosThumbsDown />} />
      </div>
    </div>
  )

}

export { ContentWrapper }