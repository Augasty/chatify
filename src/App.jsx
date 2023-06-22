import { useState } from 'react'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {SignIn} from './components/SignIn/SignIn'
import ChatRoom from './components/ChatRoom/ChatRoom'

firebase.initializeApp({
  // your configs
  apiKey: "AIzaSyB7IXG5n9X_LZsG7N8dQVlMnMNl3xlqWSQ",
  authDomain: "chatify-bc375.firebaseapp.com",
  projectId: "chatify-bc375",
  storageBucket: "chatify-bc375.appspot.com",
  messagingSenderId: "33059427772",
  appId: "1:33059427772:web:6b4d7fe56ef61bc00187b9",
  measurementId: "G-EF2X5F72W2"

})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)

  return (

    <div className='App'>
      <header>
        <section>
          {user ? <ChatRoom/>:<SignIn/>}
        </section>
      </header>
    </div>
  )
}

export default App
