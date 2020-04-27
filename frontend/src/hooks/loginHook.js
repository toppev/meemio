import { useState } from 'react'

const useLogin = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [createUsername, setCreateUsername] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')

  const handlePassword = (word) => {
    setPassword(word)
  }
  const handleUsername = (word) => {
    setUsername(word)
  }
  const handleCreateUsername = (word) => {
    setCreateUsername(word)
  }
  const handleCreatePassword = (word) => {
    setCreatePassword(word)
  }
  const handleCheckPassword = (word) => {
    setCheckPassword(word)
  }
  const nullAll = () => {
    setPassword('')
    setUsername('')
    setCreateUsername('')
    setCreatePassword('')
    setCheckPassword('')
  }
  return {
    password,
    username,
    createUsername,
    createPassword,
    checkPassword,
    handlePassword,
    handleUsername,
    handleCreateUsername,
    handleCreatePassword,
    handleCheckPassword,
    nullAll
  }

}

export { useLogin }