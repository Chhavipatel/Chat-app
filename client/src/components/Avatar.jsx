


import React from 'react';
import { PiUserCircle } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);

  let avatarName = '';

  if (name) {
    const splitName = name?.split(' ');

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    'bg-secondary',
    'bg-info',
    'bg-danger',
    'bg-success',
    'bg-warning',
    'bg-dark',
    'bg-primary',
    'bg-light',
  ];

  const randomNumber = Math.floor(Math.random() * 8);

  const isOnline = onlineUser.includes(userId);

  return (
    <div
      className={`text-dark rounded-circle font-bold relative`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className='overflow-hidden rounded-circle'
        />
      ) : (
        name ? (
          <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className={`overflow-hidden rounded-circle d-flex justify-content-center align-items-center text-lg ${bgColor[randomNumber]}`}
          >
            {avatarName}
          </div>
        ) : (
          <PiUserCircle size={width} />
        )
      )}

      {isOnline && (
        <div className='bg-success p-1 position-absolute bottom-0 end-0 z-10 rounded-circle'></div>
      )}
    </div>
  );
};

export default Avatar;