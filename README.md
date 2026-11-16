Firebase Contact App

A small contact manager built with Preact, Vite and Firebase Firestore. You can add, edit and delete contacts, and the list updates live because the data is stored in the cloud.

Live demo: https://contact-app-4txh.vercel.app

Features
Add a new contact (name and email)
Edit an existing contact
Delete a contact (asks for confirmation first)
Live list: changes appear at once, no page refresh needed (Firestore real-time listener)
Clear error messages on screen when something goes wrong (for example, Firestore rules block the request)
"No Contact Found" screen when the list is empty
Compact, phone-sized layout
Tech stack
Part	Tool
UI	Preact 10 (React-compatible)
Build tool	Vite 6
Styling	Tailwind CSS 3
Forms	Formik 2
Database	Firebase Firestore (Firebase 11)
Icons	React Icons 5
Hosting	Vercel
Is there a separate backend?

No. This app has no server of its own. The browser talks directly to Firebase Firestore, which is Google's hosted database. So there is nothing to deploy for the backend: you only deploy the frontend.

Author

Shoba Rohra, @Shobar21
