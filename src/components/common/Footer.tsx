import React from 'react'
import ProfileSocial from '../Profile/ProfileSocial'

function Footer() {
  return (
    <div className='flex items-center flex-col space-y-5 my-10'>
      <ProfileSocial showCv={false}/>
      <p className='text-text-secondary text-sm'> Juan Diaz © {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer