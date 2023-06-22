import { useState } from 'react'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  // your configs

})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {

  return (

    <div className='App'>
      <div className='App-header'>

      </div>
    </div>
  )
}

export default App
