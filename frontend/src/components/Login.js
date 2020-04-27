import React from 'react'
import { useLogin } from '../hooks/loginHook'

const Login = ({ login, register, notifier }) => {
  const loginForm = useLogin()

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