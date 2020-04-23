import React from 'react'

import { IoIosShare } from 'react-icons/io'

const CreatePostForm = ({ handleFileChange, meme }) => {

  return (
    <div className='media-holder' >
      <label className='inputfile'>
        <input onChange={handleFileChange} multiple type="file" />
        {meme
          ? <img src={URL.createObjectURL(meme)} alt='' />
          : <div id='select-file-btn' >
            <IoIosShare />
            <p>Select image</p>
          </div>
        }
      </label>
    </div>
  )
}

export { CreatePostForm }