import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLogin } from '../hooks/loginHook'

import { userService } from '../services/user'
import { initUser } from '../actions/userActions'
import { initFollowers, initFollowing } from '../actions/followAction'

const Login = ({ notifier, route }) => {

  const loginForm = useLogin()
  const [initialLoad, setInitialLoad] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    login()
    setInitialLoad(false)
  }, [])


  const handleLogin = (e) => {
    e.preventDefault()
    login(loginForm.username, loginForm.password)
    loginForm.nullAll()
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (loginForm.createPassword !== loginForm.checkPassword) {
      notifier('Passwords different')
    }
    register(loginForm.createUsername, loginForm.createPassword)
    loginForm.nullAll()
  }

  const login = async (username, password) => {
    try {
      const they = await userService.login(username, password)
      if (they) {
        dispatch(initUser(they))
        dispatch(initFollowers(they.id))
        dispatch(initFollowing(they.id))
        notifier(`Logged in as ${they.username}`, true)
        route('/home')
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

  return (
    <div className='login-and-register-container' >
      <form className='login-form' onSubmit={handleLogin}>
        <input placeholder='enter your username' value={loginForm.username} onChange={e => loginForm.handleUsername(e.target.value)} type="text" />
        <input placeholder='enter your password' value={loginForm.password} onChange={e => loginForm.handlePassword(e.target.value)} type="password" />
        <button className='btn btn-login' type='submit'>login</button>
      </form>
      <form className='login-form' onSubmit={handleRegister}>
        <input placeholder='enter a username' value={loginForm.createUsername} onChange={e => loginForm.handleCreateUsername(e.target.value)} type="text" />
        <input placeholder='enter a password (min. length 3)' value={loginForm.createPassword} onChange={e => loginForm.handleCreatePassword(e.target.value)} type="password" />
        <input placeholder='confirm password' value={loginForm.checkPassword} onChange={e => loginForm.handleCheckPassword(e.target.value)} type="password" />
        <button className='btn btn-login' type='submit' >Create Account</button>
      </form>
    </div>
  )
}

export { Login }