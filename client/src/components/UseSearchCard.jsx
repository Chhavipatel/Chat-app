import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({ user, onClose }) => {
  return (
   
    <Link to={`/${user?._id}`} onClick={onClose} className='d-flex align-items-center gap-3 p-2 border border-transparent border-bottom-1 border-secondary-subtle rounded cursor-pointer hover:border hover:border-primary'>
  <div>
    <Avatar
      width={50}
      height={50}
      name={user?.name}
      userId={user?._id}
      imageUrl={user?.profile_pic}
    />
   </div>
  <div>
    <div className='fw-semibold text-ellipsis'>{user?.name}</div>
    <p className='text-sm text-ellipsis'>{user?.email}</p>
  </div>
</Link>
  )
}

export default UserSearchCard