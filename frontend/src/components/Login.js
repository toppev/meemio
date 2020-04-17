import React, { useState } from 'react'


const Login = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e, setFunc) => {
    e.preventDefault()
    setFunc(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => handleChange(e, setUsername)} type="text" />
        <input value={password} onChange={(e) => handleChange(e, setPassword)} type="password" />

        <button className='btn' type='submit'>login</button>
      </form>
    </div>
  )
}

export { Login }