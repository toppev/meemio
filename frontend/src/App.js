import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import { ContentWrapper } from './components/ContentWrapper'
import { MobileMenu } from './components/MobileMenu'
import { Header } from './components/Header'
import { NotificationView } from './components/NotificationView'
import { Notification } from './components/Notification'
import { CreatePostView } from './components/CreatePostView'
import { ProfileView } from './components/ProfileView'
import { memeService } from './services/memes'
import { userService } from './services/user'
import { profileService } from './services/profile'
import './index.css'

// WIP
//import { Login } from './components/Login'

const App = () => {
  const [memes, setMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState(0)
  const [user, setUser] = useState(null)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    success: true,
  })

  const history = useHistory()

  useEffect(() => {
    login()
    // Get memes
    memeService.getAll()
      .then((res) => setMemes(res))
    // Get followers
    profileService.getAll()
      .then(res => {
        setFollowers(res)
        setFollowing(res)
      })
  }, [])

  const route = (dest) => {
    history.push(dest)
  }

  const login = async () => {
    try {
      const they = await userService.login('xxd', 'lol')
      setUser(they)
    } catch (err) {
      console.error(err)
    }
  }

  const like = () => {
    setCurrentMeme(currentMeme + 1)
  }

  const dislike = () => {
    setCurrentMeme(currentMeme + 1)
  }

  return (
    <div id="app-wrapper">
      {notification.message ? (
        <Notification
          success={notification.success}
          message={notification.message}
        />
      ) : null}
      <div id="app-container">
        <Header />
        <Switch />
        <Route path="/" exact>
          {memes[currentMeme] ? (
            <ContentWrapper
              title={memes[currentMeme].title}
              meme={memes[currentMeme].meme}
              like={like}
              dislike={dislike}
            />
          ) : null}
        </Route>
        <Route path="/create">
          <CreatePostView />
        </Route>
        <Route path="/notifications">
          <NotificationView />
        </Route>
        <Route path='/profile'>
          <ProfileView following={following} followers={followers} />
        </Route>
        <MobileMenu route={route} />
      </div>
    </div>
  )
}

export default App
