import React, { useState } from 'react'


const Login = ({ login, register, notifier }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [createUsername, setCreateUsername] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')

  const handleChange = (e, setFunc) => {
    e.preventDefault()
    setFunc(e.target.value)
  }
  const handleLogin = (e) => {
    e.preventDefault()
    login(username, password)
    nullAll()
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (createPassword !== checkPassword) {
      notifier('Password confirmation failed')
    }
    register(createUsername, createPassword)

  }
  const nullAll = () => {
    setUsername('')
    setPassword('')
    setCreatePassword('')
    setCreateUsername('')
    setCheckPassword('')
  }

  return (
    <div className='login-and-register-container' >
      <form className='login-form' onSubmit={handleLogin}>
        <input placeholder='enter your username' value={username} onChange={(e) => handleChange(e, setUsername)} type="text" />
        <input placeholder='enter your password' value={password} onChange={(e) => handleChange(e, setPassword)} type="password" />
        <button className='btn btn-login' type='submit'>login</button>
      </form>
      <form className='login-form' onSubmit={handleRegister}>
        <input placeholder='enter a username' value={createUsername} onChange={e => handleChange(e, setCreateUsername)} type="text" />
        <input placeholder='enter a password' value={createPassword} onChange={e => handleChange(e, setCreatePassword)} type="password" />
        <input placeholder='confirm password' value={checkPassword} onChange={e => handleChange(e, setCheckPassword)} type="password" />
        <button className='btn btn-login' type='submit' >Create Account</button>
      </form>
    </div>
  )
}

export { Login }