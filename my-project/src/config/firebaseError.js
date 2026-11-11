// Turns a Firebase error into a message a person can act on.
// (The app used to hide these errors in the browser console.)
export function explainFirebaseError(error) {
  const code = (error && error.code) || ''
  const raw = (error && error.message) || String(error)

  if (code === 'permission-denied') {
    return (
      'Firestore refused this request (permission denied). ' +
      'Open Firebase Console > Firestore Database > Rules and allow read and write ' +
      'for the "contact-app" collection. Rules made in "test mode" stop working after 30 days.'
    )
  }
  if (code === 'unavailable') {
    return (
      'The app could not reach Firestore. Check your internet connection, and make sure ' +
      'the Firestore database has been created in the Firebase Console.'
    )
  }
  if (code === 'not-found' || code === 'failed-precondition' || /does not exist/i.test(raw)) {
    return (
      'The Firestore database does not exist yet. Open Firebase Console > Firestore Database ' +
      'and click "Create database".'
    )
  }
  if (code === 'unauthenticated' || code === 'invalid-argument') {
    return `Firebase rejected the request (${code}). Check the firebaseConfig values in src/config/firebase.js.`
  }
  return `Something went wrong: ${raw}`
}
