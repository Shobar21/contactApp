import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import ContactCards from './components/ContactCards.jsx'
import Model from './components/Model.jsx'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'
import { explainFirebaseError } from './config/firebaseError'
import useDisclourse from './Hooks/useDisclourse.jsx'
import NoContact from './components/noContact.jsx'

export function App() {
  const [contacts, setContacts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState('')
  const { onOpen, onClose, open } = useDisclourse()
  const [selectedContact, setSelectedContact] = useState(null) // Store contact for edit

  useEffect(() => {
    // live list: Firestore calls this again whenever a contact is added, edited or deleted
    const unsubscribe = onSnapshot(
      collection(db, 'contact-app'),
      (snapshot) => {
        setContacts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        setLoadError('')
        setLoaded(true)
      },
      (error) => {
        console.error('Could not load contacts:', error)
        setLoadError(explainFirebaseError(error))
        setLoaded(true)
      }
    )
    return () => unsubscribe()
  }, [])

  // Function to open modal with selected contact
  const handleEdit = (contact) => {
    setSelectedContact(contact)
    onOpen()
  }

  // the "+" button adds a NEW contact, so forget the one that was edited before
  const handleAdd = () => {
    setSelectedContact(null)
    onOpen()
  }

  return (
    <>
      <div className='max-w-[360px] mx-auto px-4'>
        <Navbar isOpen={handleAdd} />

        {loadError && (
          <div
            role='alert'
            style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '10px',
              background: '#fee2e2',
              color: '#991b1b',
              fontSize: '14px',
              lineHeight: 1.45,
            }}
          >
            {loadError}
          </div>
        )}

        <div>
          {!loaded ? (
            <p style={{ color: '#fff', marginTop: '24px', textAlign: 'center' }}>Loading contacts...</p>
          ) : contacts.length > 0 ? (
            contacts.map((contact) => <ContactCards key={contact.id} contact={contact} onEdit={handleEdit} />)
          ) : (
            !loadError && <NoContact />
          )}
        </div>
      </div>
      {open && <Model isOpen={open} onClose={onClose} contact={selectedContact} />}
    </>
  )
}
