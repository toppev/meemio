import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import { Button } from './Button'
import { MemeHolder } from './MemeHolder'

import { getMemes } from '../services/memes'
import { addLiked, addDisliked } from '../actions/userActions'

const ContentWrapper = ({ changeFollow }) => {

  const [memes, setMemes] = useState([])
  const [memeIndex, setMemeIndex] = useState(0)
  const currentMeme = memes[memeIndex]

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('home views effect hook called')
    getNewMemes()
  }, [])

  const like = () => {
    dispatch(addLiked(currentMeme.id))
    setMemeIndex(memeIndex + 1)
    if (currentMeme >= memes.length - 2) {
      getNewMemes()
    }
  }

  const dislike = () => {
    dispatch(addDisliked(currentMeme.id))
    setMemeIndex(memeIndex + 1)
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
      {memes.map((meme, i) => <MemeHolder active={i === memeIndex ? true : false}
        changeFollow={changeFollow} {...meme} />)
      }
      <div className='mobile-specific'>
        <Button onClick={like} type='btn-like' content={<IoIosThumbsUp />} />
        <Button onClick={dislike} type='btn-dislike' content={<IoIosThumbsDown />} />
      </div>
    </div>
  )
}

export { ContentWrapper }