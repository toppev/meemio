import React, { useState } from 'react'

const CreatePostView = () => {

  const [meme, setMeme] = useState(null)


  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.files[0])
    setMeme(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <div>
      <form>
        <h2>File upload</h2>
        <input onChange={handleChange} multiple type="file" />
        <button type='submit' >Upload</button>
      </form>
    </div>
  )

}

export { CreatePostView }