import React from 'react'
import { Switch, Route, Link, useHistory, useParams } from 'react-router-dom'

import { ContentWrapper } from './components/ContentWrapper'
import { MobileMenu } from './components/MobileMenu'
import { Header } from './components/Header'
import { NotificationView } from './components/NotificationView'

import './index.css'

const App = () => {

  const history = useHistory()

  const route = (dest) => {
    history.push(dest)
  }
  console.log('hello?')

  return (
    <div id='app-container'>
      <Header />
      <Switch />
      <Route path='/' exact >
        <ContentWrapper title='purkka' meme='https://cloetta.studio.crasman.fi/pub/web/images/tuotekuvat/PNG-kuva_1009133_Jenkki+Pro+Junior+75g+Hra+Hakkarainen.png?c=tuote' />
      </Route>
      <Route path='/notifications'>
        <NotificationView />
      </Route>
      <MobileMenu route={route} />
    </div>
  )
}

export default App