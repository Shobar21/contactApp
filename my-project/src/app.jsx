import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import ContactCards from './components/ContactCards.jsx'
import Model from './components/Model.jsx'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'
import useDisclourse from './Hooks/useDisclourse.jsx'
import NoContact from './components/noContact.jsx'

export function App() {
  const [contacts, setContacts] = useState([])
  const { onOpen, onClose, open } = useDisclourse()
  const [selectedContact, setSelectedContact] = useState(null) // Store contact for edit

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactCollection = collection(db, 'contact-app')
        // const contactSnapshot = await getDocs(contactCollection)
        onSnapshot(contactCollection, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setContacts(contactLists)
          return contactLists
        })
      } catch (error) {
        console.log(error)
      }
    }
    getContacts()
  }, [])

  // Function to open modal with selected contact
  const handleEdit = (contact) => {
    setSelectedContact(contact)
    onOpen()
  }

  return (
    <>
      <div className='max-w-[360px] mx-auto px-4'>
        <Navbar isOpen={onOpen} />
        <div>
          {contacts.length > 0 ? (
            contacts.map((contact) => <ContactCards key={contact.id} contact={contact} onEdit={handleEdit} />)
          ) : (
            <NoContact /> // Use PascalCase component
          )}
        </div>
      </div>
      {open && <Model isOpen={open} onClose={onClose} contact={selectedContact} />}
    </>
  )
}
