import React from 'react'

import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import { Button } from './Button'
import { MemeHolder } from './MemeHolder'
const ContentWrapper = ({ meme, title, like, dislike, user, changeFollow, userId }) => {
  return (
    <div className='content-wrapper' >
      <MemeHolder meme={meme} title={title} user={user} changeFollow={changeFollow} userId={userId} />
      <div className='mobile-specific'>
        <Button onClick={like} type='btn-like' content={<IoIosThumbsUp />} />
        <Button onClick={dislike} type='btn-dislike' content={<IoIosThumbsDown />} />
      </div>
    </div>
  )

}

export { ContentWrapper }