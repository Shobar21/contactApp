import React from 'react'
import contact from '../assets/Contact.png'

function NoContact() {
  return (
    <div className='flex gap-2 justify-center items-center mt-[10rem]'>
      <img src={contact} alt='' />
      <p className='text-white text-2xl font-bold'>No Contact Found</p>
    </div>
  )
}

export default NoContact
