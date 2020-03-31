import React from 'react'

const Button = ({ type, onClick, content }) => {

  const className = `btn ${type}`

  return (<button onClick={e => onClick(e)} className={className}>
    {content}
  </button>)
}

export { Button }