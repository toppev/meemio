import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import { ContentWrapper } from './components/ContentWrapper'
import { MobileMenu } from './components/MobileMenu'
import { Header } from './components/Header'
import { NotificationView } from './components/NotificationView'

import { memeService } from './services/memes'

import './index.css'

const App = () => {

  const [memes, setMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState(0)

  const history = useHistory()

  useEffect(() => {
    memeService.getAll()
      .then(res => setMemes(res))
  }, [])

  const route = (dest) => {
    history.push(dest)
  }

  const like = () => {
    setCurrentMeme(currentMeme + 1)
  }

  const dislike = () => {
    setCurrentMeme(currentMeme + 1)

  }


  return (
    <div id='app-container'>
      <Header />
      <Switch />
      <Route path='/' exact >
        {memes[currentMeme]
          ? <ContentWrapper title={memes[currentMeme].title}
            meme={memes[currentMeme].meme} like={like} dislike={dislike} />
          : null
        }
      </Route>
      <Route path='/notifications'>
        <NotificationView />
      </Route>
      <MobileMenu route={route} />
    </div>
  )
}

export default App