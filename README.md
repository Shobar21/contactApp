
README · MD
# Firebase Contact App
 
A small contact manager built with **Preact**, **Vite** and **Firebase Firestore**. You can add, edit and delete contacts, and the list updates live because the data is stored in the cloud.
 
**Live demo:** https://contact-app-4txh.vercel.app
 
---
 
## Features
 
- Add a new contact (name and email)
- Edit an existing contact
- Delete a contact (asks for confirmation first)
- Live list: changes appear at once, no page refresh needed (Firestore real-time listener)
- Clear error messages on screen when something goes wrong (for example, Firestore rules block the request)
- "No Contact Found" screen when the list is empty
- Compact, phone-sized layout
## Tech stack
 
| Part | Tool |
|---|---|
| UI | [Preact](https://preactjs.com/) 10 (React-compatible) |
| Build tool | [Vite](https://vite.dev/) 6 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3 |
| Forms | [Formik](https://formik.org/) 2 |
| Database | [Firebase Firestore](https://firebase.google.com/docs/firestore) (Firebase 11) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) 5 |
| Hosting | [Vercel](https://vercel.com/) |
 
## Is there a separate backend?
 
No. This app has **no server of its own**. The browser talks directly to **Firebase Firestore**, which is Google's hosted database. So there is nothing to deploy for the backend: you only deploy the frontend.

## How the data is stored
 
Contacts live in one Firestore collection called **`contact-app`**. Every document has two fields:
 
```json
{
  "name": "Shoba Rohra",
  "email": "someone@example.com"
}

## Run it on your computer
 
You need [Node.js](https://nodejs.org/) 18 or newer.
 
```bash
git clone https://github.com/Shobar21/contactApp.git
cd contactApp/my-project
npm install
npm run dev
```
## Author
 
Shoba Rohra, [@Shobar21](https://github.com/Shobar21)
