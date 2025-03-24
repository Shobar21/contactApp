import React from 'react'
import logo from '../assets/firebase.png'
import { FiSearch } from 'react-icons/fi'
import { FaCirclePlus } from 'react-icons/fa6'

function Navbar({ isOpen }) {
  return (
    <div>
      <div className='h-[60px] bg-white rounded-lg my-4 flex items-center justify-center gap-2'>
        <img src={logo} alt='' />
        <h1 className='font-bold text-2xl'>Firebase Contact App</h1>
      </div>
      <div className='relative flex items-center'>
        <FiSearch className='text-3xl text-white absolute ml-2' />
        <input
          type='text'
          placeholder='Search contact'
          className='bg-transparent border border-white text-white h-10 rounded-md flex-grow pl-10'
        />
        <div>
          <FaCirclePlus className='ml-2 text-white text-5xl cursor-pointer' onClick={isOpen} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
