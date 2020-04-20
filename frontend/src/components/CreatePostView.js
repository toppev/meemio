import React, { useState } from 'react'

import { Button } from './Button'

const CreatePostView = () => {

  const [meme, setMeme] = useState(null)
  const [title, setTitle] = useState('')


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

  const handleSubmit = (e) => {
    e.preventDefault()
    const post = {
      meme,
      title
    }
    console.log(post)
  }

  return (
    <form onSubmit={handleSubmit} className='content-wrapper'>
      <div className='media-holder' >
        {meme
          ? <img src={URL.createObjectURL(meme)} alt='' />
          : <input onChange={handleFileChange} multiple type="file" />
        }
      </div>
      <input onChange={e => handleChange(e, setTitle)} value={title} type="text" />
      {meme
        ? <Button content='Upload' type='btn-like' contextType='submit' />
        : null
      }
      <Button content='Cancel' type='btn-dislike' onClick={cancelCreation} />
    </form>
  )

}

export { CreatePostView }