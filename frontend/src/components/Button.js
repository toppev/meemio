import React from 'react'

const Button = ({ type, onClick, content, contextType }) => {

  const className = `btn ${type}`
  const onClickExists = onClick
    ? onClick
    : null

  return (<button type={contextType} onClick={onClickExists ? e => onClick(e) : null} className={className}>
    {content}
  </button>)
}

export { Button }