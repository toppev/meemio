import React, { useState } from 'react'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ContentWrapper } from './components/HomeView'
import { MobileMenu } from './components/MobileMenu'
import { Header } from './components/Header'
import { NotificationView } from './components/NotificationView'
import { Notification } from './components/Notification'
import { CreatePostView } from './components/CreatePostView'
import { ProfileView } from './components/ProfileView'
import { Login } from './components/Login'

import { userService } from './services/user'

import { followAction, unfollowAction } from './actions/followAction'
import { readNotifications } from './actions/notificationsActions'

import './index.css'

const App = () => {

  const [notification, setNotification] = useState({
    message: null,
    successful: true,
  })

  const dispatch = useDispatch()
  const history = useHistory()
  const { user, followers, following, notifications } = useSelector(state => state)

  const route = dest => {
    history.push(dest)

    if (dest === '/notifications') {
      dispatch(readNotifications())
    }
  }

  const notifier = (message, successful) => {
    setNotification({ message, successful })
    setTimeout(() => setNotification({
      message: null,
      successful: true
    }), 3000)
  }

  const aviUpdate = async formData => {
    try {
      const res = await userService.aviUpdate(formData)
      if (res) notifier('Your avatar has been updated', true)
    } catch (err) {
      console.error(err)
      notifier('There was an error updating your avatar', false)
    }
  }

  const changeFollow = async id => {
    const unfollowable = following.find(u => u.id === id)
    if (unfollowable) {
      notifier(`Unfollowed ${unfollowable.username}`, true)
      dispatch(unfollowAction(id))
    } else {
      notifier(`Followed ${'mike'}`, true)
      dispatch(followAction(id))
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
            {user ?
              <ContentWrapper changeFollow={changeFollow} />
              : <Redirect to='/' />}
          </Route>
          <Route path="/create">
            {user ? <CreatePostView notifier={notifier} />
              : <Redirect to='/' />
            }
          </Route>
          <Route path="/notifications">
            {user ? <NotificationView notifications={notifications} />
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
            <Login notifier={notifier} route={route} />
          </Route>
        </Switch>
        {user ? <MobileMenu unread={notifications[0] ? !notifications.every(n => n.hasRead === true) : false} route={route} />
          : null}
      </div>
    </div>
  )
}

export default App