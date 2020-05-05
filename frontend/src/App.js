import React from 'react'
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

import { useInterval } from './hooks/useInterval'

import { followAction, unfollowAction, initFollowers } from './actions/followAction'
import { readNotifications, getNotifications } from './actions/notificationsActions'
import { setNotification } from './actions/notificationAction'

import './index.css'

const App = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { user, following, notifications, notification } = useSelector(state => state)

  useInterval(() => {
    dispatch(getNotifications())
    if (1 + notifications.findIndex(n => n.hasRead === false && n.type === 1)) {
      dispatch(initFollowers(user.id))
    }
  })

  const route = dest => {
    history.push(dest)
    if (dest === '/notifications') {
      dispatch(readNotifications())
    }
  }
  const changeFollow = async (id, followedUsername) => {
    const unfollowable = following.find(u => u.id === id)
    if (unfollowable) {
      dispatch(setNotification(`Unfollowed ${unfollowable.username}`, true))
      dispatch(unfollowAction(id))
    } else {
      dispatch(followAction(id))
      dispatch(setNotification(`Followed ${followedUsername}`, true))
    }
  }

  return (
    <div id="app-wrapper">
      <Notification
        success={notification.successful}
        message={notification.message}
      />
      <div id="app-container">
        <Header />
        <Switch>
          <Route path="/home" exact>
            {user ?
              <ContentWrapper changeFollow={changeFollow} />
              : <Redirect to='/' />}
          </Route>
          <Route path="/create">
            {user ? <CreatePostView />
              : <Redirect to='/' />
            }
          </Route>
          <Route path="/notifications">
            {user ? <NotificationView notifications={notifications} />
              : <Redirect to='/' />
            }
          </Route>
          <Route path='/profile'>
            {user ? <ProfileView changeFollow={changeFollow} avi={user.avatar ? user.avatar.id : null}
              username={user.username}
            />
              : <Redirect to='/' />
            }
          </Route>
          <Route path='/'>
            <Login route={route} />
          </Route>
        </Switch>
        {user ? <MobileMenu unread={notifications[0] ? !notifications.every(n => n.hasRead === true) : false} route={route} />
          : null}
      </div>
    </div>
  )
}

export default App