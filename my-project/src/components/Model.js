import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Formik, Form, Field } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

function Model({ isOpen, onClose, contact }) {
  const [initialValues, setInitialValues] = useState({ name: '', email: '' })

  useEffect(() => {
    if (contact) {
      setInitialValues({ name: contact.name, email: contact.email })
    } else {
      setInitialValues({ name: '', email: '' })
    }
  }, [contact])

  if (!isOpen) return null

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (contact) {
        // Update existing contact
        const contactRef = doc(db, 'contact-app', contact.id)
        await updateDoc(contactRef, values)
        console.log('Contact Updated:', values)
      } else {
        // Add new contact
        const contactRef = collection(db, 'contact-app')
        await addDoc(contactRef, values)
        console.log('Contact Added:', values)
      }
      resetForm()
      onClose()
    } catch (error) {
      console.error('Error saving contact:', error)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg relative'>
        <AiOutlineCloseCircle className='absolute top-2 right-2 text-xl font-bold cursor-pointer' onClick={onClose} />
        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
          {() => (
            <Form className='flex flex-col gap-2'>
              <Field type='text' name='name' className='mt-3 p-2 border-2 border-black' placeholder='Enter Name' />
              <Field type='email' name='email' className='mt-3 p-2 border-2 border-black' placeholder='Enter Email' />
              <button type='submit' className='mt-3 bg-darkyellow border-2 border-black rounded p-1'>
                {contact ? 'Update Contact' : 'Add Contact'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Model
