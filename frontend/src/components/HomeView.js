import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import { Button } from './Button'
import { MemeHolder } from './MemeHolder'

import { getMemes } from '../services/memes'
import { addLiked, addDisliked } from '../actions/userActions'
import { nextMeme } from '../actions/currentMemeAction'

const ContentWrapper = ({ changeFollow }) => {

  const memeIndex = useSelector(state => state.memeIndex)
  const [memes, setMemes] = useState([])
  const currentMeme = memes[memeIndex]

  const dispatch = useDispatch()

  useEffect(() => {
    getNewMemes()
  }, [])

  const like = () => {
    if (!currentMeme) return
    dispatch(addLiked(currentMeme.id))
    dispatch(nextMeme())
    if (currentMeme >= memes.length - 2) {
      getNewMemes()
    }
  }

  const dislike = () => {
    if (!currentMeme) return
    dispatch(addDisliked(currentMeme.id))
    dispatch(nextMeme())
    if (currentMeme === memes.length - 2) {
      getNewMemes()
    }
  }

  const getNewMemes = async () => {
    const memeIds = memes.map(mem => mem.id)
    const meymes = await getMemes()
    const filteredMeymes = meymes.filter(mem => {
      const a = 1 + memeIds.indexOf(mem.id)
      return !a
    })
    setMemes([...memes, ...filteredMeymes])
  }


  return (
    <div className='content-wrapper' >
      {currentMeme ? memes.map((meme, i) => <MemeHolder key={i} active={i === memeIndex ? true : false}
        changeFollow={changeFollow} {...meme} />)
        : <h2>Sorry no new memes</h2>}
      <div className='mobile-specific'>
        <Button onClick={like} type='btn-like' content={<IoIosThumbsUp />} />
        <Button onClick={dislike} type='btn-dislike' content={<IoIosThumbsDown />} />
      </div>
    </div>
  )
}

export { ContentWrapper }