import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { CreatePostForm } from './CreatePostForm'
import { Button } from './Button'

import { addMeme } from '../actions/userActions'

const CreatePostView = ({ notifier, setUser }) => {

  const [meme, setMeme] = useState(null)
  const [title, setTitle] = useState('')

  const dispatch = useDispatch()

  const handleFileChange = (e) => {
    e.preventDefault()
    setMeme(e.target.files[0])
  }

  const handleChange = (e, setter) => {
    e.preventDefault()
    setter(e.target.value)
  }

  const cancelCreation = (e) => {
    e.preventDefault()
    setMeme(null)
    setTitle('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', meme)
    formData.append('title', title)
    dispatch(addMeme(formData))
    notifier('Meme uploaded', true)
    setMeme(null)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className='content-wrapper'>
      <CreatePostForm handleFileChange={handleFileChange} meme={meme} />
      <input id='title-input' placeholder='Enter a title for your meme' onChange={e => handleChange(e, setTitle)} value={title} type="text" />
      {meme ? <Button content='Upload' type='btn-like' contextType='submit' />
        : null}
      <Button content='Clear all' type='btn-dislike' onClick={cancelCreation} />
    </form>
  )
}

export { CreatePostView }