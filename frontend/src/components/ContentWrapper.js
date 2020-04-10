import React from 'react'

import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import { Button } from './Button'

const ContentWrapper = ({ meme, title }) => {

  return (
    <div id='content-wrapper' >
      <div id='media-holder'>
        <img src={meme} alt='well fuck' />
      </div>
      <h2>{title}</h2>
      <div className='mobile-specific'>
        <Button type='btn-like' content={<IoIosThumbsUp />} />
        <Button type='btn-dislike' content={<IoIosThumbsDown />} />
      </div>
    </div>
  )

}

export { ContentWrapper }