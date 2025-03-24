import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { RiEditCircleLine } from 'react-icons/ri'
import { IoMdTrash } from 'react-icons/io'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

function ContactCards({ contact, onEdit }) {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        const contactRef = doc(db, 'contact-app', contact.id)
        await deleteDoc(contactRef)

        console.log('Contact deleted:', contact.id)
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }
  }

  return (
    <div>
      <div key={contact.id} className='bg-yellow flex justify-between items-center rounded-xl h-[64px] mt-4 p-2'>
        <div className='flex gap-3 items-center'>
          <HiOutlineUserCircle className='text-orange text-5xl' />
          <div>
            <h2 className='font-bold'>{contact.name}</h2>
            <p className='text-sm font-normal'>{contact.email}</p>
          </div>
        </div>
        <div className='flex gap-3 items-center'>
          <RiEditCircleLine className='text-3xl cursor-pointer' onClick={() => onEdit(contact)} />
          <IoMdTrash className='text-purple text-3xl cursor-pointer' onClick={handleDelete} />
        </div>
      </div>
    </div>
  )
}

export default ContactCards
