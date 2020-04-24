import React from 'react'
import { IoIosPerson } from 'react-icons/io'

const FollowView = ({ people }) => {
  return (
    <div className='follow-container'>
      {people.map((p, i) => <div className='follow' key={i}>
        {p.avatar
          ? <img src={p.avatar} alt={"Avatar missing"} />
          : <IoIosPerson />
        }
        <p>{p.username}</p>
      </div>)}
    </div>
  )
}
export { FollowView }