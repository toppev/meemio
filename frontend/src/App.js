import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'

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
import { Login } from './components/Login'

const App = () => {
  const [memes, setMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState(0)
  const [user, setUser] = useState(null)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [avatar, setAvatar] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    successful: true,
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

  const login = async (username, password) => {
    try {
      const they = await userService.login(username, password)
      if (they) {
        setUser(they)
        route('/home')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const register = async (username, password) => {
    try {
      const they = await userService.register(username, password)
      console.log(they)
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

  const notifier = (message, successful) => {
    setNotification({ message, successful })
    setTimeout(() => setNotification({
      message: null,
      successful: true
    }), 3000)
  }

  const aviUpdate = async (formData) => {
    try {
      const res = await userService.aviUpdate(formData)
      if (res) notifier('Your avatar has been updated', true)
    } catch (err) {
      console.error(err)
      notifier('There was an error updating your avatar', false)
    }
  }

  return (
    <div id="app-wrapper">
      {notification.message ? (
        <Notification
          success={notification.successful}
          message={notification.message}
        />
      ) : null}
      <div id="app-container">
        <Header />
        <Switch>
          <Route path="/home" exact>
            {user ? memes[currentMeme] ? (
              <ContentWrapper
                title={memes[currentMeme].title}
                meme={memes[currentMeme].meme}
                like={like}
                dislike={dislike}
              />
            ) : null
              : <Redirect to='/' />}
          </Route>
          <Route path="/create">
            {user ? <CreatePostView />
              : <Redirect to='/' />
            }
          </Route>
          <Route path="/notifications">
            {user ? <NotificationView />
              : <Redirect to='/' />
            }
          </Route>
          <Route path='/profile'>
            {user ? <ProfileView aviUpdate={aviUpdate} following={following} followers={followers} />
              : <Redirect to='/' />
            }
          </Route>
          <Route path='/'>
            <Login notifier={notifier} register={register} login={login} />
          </Route>
        </Switch>
        {user ? <MobileMenu route={route} />
          : null}
      </div>
    </div>
  )
}

export default App