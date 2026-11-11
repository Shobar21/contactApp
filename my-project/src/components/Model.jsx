import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Formik, Form, Field } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { explainFirebaseError } from '../config/firebaseError'

// after this many ms of waiting we tell the person that saving is slow
const SLOW_MS = 8000

function Model({ isOpen, onClose, contact }) {
  const [initialValues, setInitialValues] = useState({ name: '', email: '' })
  const [error, setError] = useState('')
  const [slow, setSlow] = useState(false)
  const slowTimer = useRef(null)

  useEffect(() => {
    if (contact) {
      setInitialValues({ name: contact.name, email: contact.email })
    } else {
      setInitialValues({ name: '', email: '' })
    }
  }, [contact])

  useEffect(() => () => clearTimeout(slowTimer.current), [])

  if (!isOpen) return null

  const handleSubmit = async (values, { resetForm }) => {
    setError('')
    setSlow(false)
    slowTimer.current = setTimeout(() => setSlow(true), SLOW_MS)

    try {
      if (contact) {
        // Update existing contact
        const contactRef = doc(db, 'contact-app', contact.id)
        await updateDoc(contactRef, values)
      } else {
        // Add new contact
        const contactRef = collection(db, 'contact-app')
        await addDoc(contactRef, values)
      }
      resetForm()
      onClose()
    } catch (err) {
      console.error('Error saving contact:', err)
      setError(explainFirebaseError(err))
    } finally {
      clearTimeout(slowTimer.current)
      setSlow(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg relative' style={{ maxWidth: '340px' }}>
        <AiOutlineCloseCircle className='absolute top-2 right-2 text-xl font-bold cursor-pointer' onClick={onClose} />
        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className='flex flex-col gap-2'>
              <Field type='text' name='name' className='mt-3 p-2 border-2 border-black' placeholder='Enter Name' />
              <Field type='email' name='email' className='mt-3 p-2 border-2 border-black' placeholder='Enter Email' />

              {error && (
                <p
                  role='alert'
                  style={{
                    marginTop: '8px',
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#fee2e2',
                    color: '#991b1b',
                    fontSize: '13px',
                    lineHeight: 1.4,
                  }}
                >
                  {error}
                </p>
              )}
              {slow && !error && (
                <p role='status' style={{ marginTop: '8px', fontSize: '13px', color: '#92400e' }}>
                  Still saving... this is taking long. Check your internet and that the Firestore database exists.
                  Please do not press the button again.
                </p>
              )}

              <button
                type='submit'
                disabled={isSubmitting}
                className='mt-3 bg-darkyellow border-2 border-black rounded p-1'
                style={isSubmitting ? { opacity: 0.6, cursor: 'wait' } : undefined}
              >
                {isSubmitting ? 'Saving...' : contact ? 'Update Contact' : 'Add Contact'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Model
