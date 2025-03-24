import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA1BeJwh9srpyaOyEvmo-JR_t9v0dcZMo4',
  authDomain: 'vite-contat-app.firebaseapp.com',
  projectId: 'vite-contat-app',
  storageBucket: 'vite-contat-app.appspot.com',
  messagingSenderId: '251482976143',
  appId: '1:251482976143:web:28d8dd96088bbe4dff25fa',
  measurementId: 'G-DT9F024630',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Conditionally initialize Analytics (only in the browser)
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    getAnalytics(app)
  })
}
