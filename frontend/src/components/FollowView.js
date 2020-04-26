import React from 'react'
import { IoIosPerson } from 'react-icons/io'

const FollowView = ({ people, changeFollow, following }) => {
  if (!people) return <div><p>No one here</p> </div>
  return (
    <div className='follow-container'>
      {people[0] ? people.map((p, i) => <div onClick={following ? () => changeFollow(p.id) : null} className='follow' key={i}>
        {p.avatar
          ? <img src={`/media/${p.avatar.id}`} alt={"Avatar missing"} />
          : <IoIosPerson />
        }
        <p>{p.username}</p>
      </div>) : null}
    </div>
  )
}
export { FollowView }