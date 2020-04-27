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
import { notificationService } from './services/notifications'
const App = () => {
  const [memes, setMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState(0)
  const [user, setUser] = useState(null)
  const [initialLoad, setInitialLoad] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  const [userLinks, setUserLinks] = useState('')
  const [userId, setUserId] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    successful: true,
  })

  const history = useHistory()

  useEffect(() => {
    login()
    setInitialLoad(false)
    notificationService.getAll()
      .then(res => {
        console.log('inside thingy')
        console.log(res)
        setNotifications(res)
      })
      .catch(err => console.log(err))
  }, [])

  const route = (dest) => {
    history.push(dest)
  }

  const login = async (username, password) => {
    try {
      const they = await userService.login(username, password)
      if (they) {
        setUser(they)
        console.log(they)
        const meymes = await memeService.getMemes()
        setMemes(meymes)
        route('/home')
        setUserLinks(they._links)
        setUserId(they._links.user.href.substring(they._links.user.href.length - 1))
        notifier(`Logged in as ${they.username}`, true)
        const followedAccounts = await userService.getFollowing(they._links.user.href.substring(they._links.user.href.length - 1))
        setFollowing(followedAccounts._embedded.users)
        const followingAccoutns = await userService.getFollowers(they._links.user.href.substring(they._links.user.href.length - 1))
        setFollowers(followingAccoutns._embedded.users)
        const noti = await notificationService.getAll()
        setNotifications(noti)
      } else {
        if (!initialLoad) notifier('Login failed', false)
      }
    } catch (error) {
      console.error(error)
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

  const like = async () => {
    memeService.like(memes[currentMeme].id)
    setCurrentMeme(currentMeme + 1)
    if (user.likes) {
      setUser({ ...user, likes: [...user.likes, memes[currentMeme].id] })
    } else {
      setUser({ ...user, likes: [memes[currentMeme].id] })
    }
    if (currentMeme >= memes.length - 2) {
      const meymes = await memeService.getMemes()
      setMemes([...memes, ...meymes])
    }
  }

  const dislike = async () => {
    memeService.dislike(memes[currentMeme].id)
    setCurrentMeme(currentMeme + 1)
    if (user.dislikes) {
      setUser({ ...user, dislikes: [...user.dislikes, memes[currentMeme].id] })
    } else {
      setUser({ ...user, dislikes: [memes[currentMeme].id] })
    }
    if (currentMeme === memes.length - 2) {
      const meymes = await memeService.getMemes()
      setMemes([...memes, ...meymes])
    }
  }

  const readAll = () => {
    notificationService.readAll()
    const newAr = notifications.map(n => ({ ...n, hasRead: true }))
    setNotifications(newAr)
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

  const changeFollow = async (id) => {
    if (!following[0]) {
      await userService.follow(id)
      const justFollowed = await userService.getUser(id)
      setFollowing([justFollowed])
      notifier(`Followed ${justFollowed.username}`, true)
    } else {
      const unfollowable = following.find(u => u.id === id)
      if (unfollowable) {
        notifier(`Unfollowed ${unfollowable.username}`, true)
        userService.unfollow(id)
        setFollowing(following.filter(f => f.id !== id))
      } else {
        userService.follow(id)
        const justFollowed = await userService.getUser(id)
        setFollowing([...following, justFollowed])
        notifier(`Followed ${justFollowed.username}`, true)
      }
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
                changeFollow={changeFollow}
                userId={memes[currentMeme].userId}
              />
            ) : <h2>No new memes, sorry </h2>
              : <Redirect to='/' />}
          </Route>
          <Route path="/create">
            {user ? <CreatePostView setUser={(meme) => setUser({ ...user, posts: [...user.posts, meme] })} notifier={notifier} />
              : <Redirect to='/' />
            }
          </Route>
          <Route path="/notifications">
            {user ? <NotificationView readAll={readAll} notifications={notifications} />
              : <Redirect to='/' />
            }
          </Route>
          <Route path='/profile'>
            {user ? <ProfileView changeFollow={changeFollow} avi={user.avatar ? user.avatar.id : null} username={user.username}
              aviUpdate={aviUpdate} following={following} followers={followers} />
              : <Redirect to='/' />
            }
          </Route>
          <Route path='/'>
            <Login notifier={notifier} register={register} login={login} />
          </Route>
        </Switch>
        {user ? <MobileMenu unread={notifications[0] ? !notifications.every(n => n.hasRead === true) : false} route={route} />
          : null}
      </div>
    </div>
  )
}

export default App