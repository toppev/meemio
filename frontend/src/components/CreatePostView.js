import React, { useState } from 'react'

import { Button } from './Button'

const CreatePostView = () => {

  const [meme, setMeme] = useState(null)
  const [title, setTitle] = useState('')

  const handleFileChange = (e) => {
    e.preventDefault()
    console.log(e.target.files[0])
    setMeme(e.target.files[0])
  }

  const handleChange = (e, setter) => {
    e.preventDefault()
    setter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  const cancelCreation = (e) => {
    e.preventDefault()
    setMeme(null)
    setTitle('')
  }

  return (
    <form className='content-wrapper'>
      <input onChange={handleFileChange} multiple type="file" />
      <input onChange={e => handleChange(e, setTitle)} value={title} type="text" />
      <button type='submit' >Upload</button>
      <Button content='Upload' type='btn-like' contextType='submit' />
      <Button content='Cancel' type='btn-dislike' onClick={cancelCreation} />

    </form>
  )

}

export { CreatePostView }