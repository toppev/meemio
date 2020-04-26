import React from 'react'

const Button = ({ type, onClick, content, contextType }) => {

  const className = `btn ${type}`

  return (<button type={contextType} onClick={e => onClick(e)} className={className}>
    {content}
  </button>)
}

export { Button }