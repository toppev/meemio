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
import './index.css'

// WIP
import { Login } from './components/Login'

const App = () => {
  const [memes, setMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState(0)
  const [user, setUser] = useState(null)
  const [initialLoad, setInitialLoad] = useState(true)
  const [notification, setNotification] = useState({
    message: null,
    successful: true,
  })

  const history = useHistory()

  useEffect(() => {
    login()
    setInitialLoad(false)
  }, [])

  const route = (dest) => {
    history.push(dest)
  }

  const login = async (username, password) => {
    try {
      const they = await userService.login(username, password)
      if (they) {
        if (typeof they === 'string') {
          console.log(they, 'is string')
          setUser(JSON.parse(they))
        } else {
          setUser(they)
          console.log(they, 'is object')
        }
        const meymes = await memeService.getMemes()
        setMemes(meymes)
        route('/home')
        notifier(`Logged in as ${they.username}`, true)

      } else {
        if (!initialLoad) notifier('Login failed', false)
      }
    } catch (error) {
      console.log(error)
    }

  }

  const register = async (username, password) => {
    try {
      await userService.register(username, password)
      login(username, password)
    } catch (err) {
      console.error(err)
    }
  }

  const like = () => {
    memeService.like(memes[currentMeme].id)
      .then(res => console.log(res))
    setCurrentMeme(currentMeme + 1)
    changeFollow()
  }

  const dislike = () => {
    memeService.dislike(memes[currentMeme].id)
      .then(res => console.log(res))
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

  const changeFollow = () => {
    if (user.following.find(u => u.id === memes[currentMeme].userId)) {
      userService.follow(memes[currentMeme].userId)
        .then(res => console.log(res))
    } else {
      userService.unfollow(memes[currentMeme].userId)
        .then(res => console.log(res))
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
                meme={memes[currentMeme].media.id}
                like={like}
                dislike={dislike}
                user={memes[currentMeme].username}
              />
            ) : null
              : <Redirect to='/' />}
          </Route>
          <Route path="/create">
            {user ? <CreatePostView notifier={notifier} />
              : <Redirect to='/' />
            }
          </Route>
          <Route path="/notifications">
            {user ? <NotificationView />
              : <Redirect to='/' />
            }
          </Route>
          <Route path='/profile'>
            {user ? <ProfileView aviUpdate={aviUpdate} following={user.following} followers={user.followers} />
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