import React from 'react'
import firebase from 'firebase/app'
import { signOut } from 'firebase/auth'
const auth = firebase.auth()
export const SignIn = () => {

    function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
  return (
    <button onClick={signInWithGoogle}>Sign In with Google to start chatting 💬</button>
  )
}
export const SignOut = () => {
  return auth.currentUser && (
    <button onClick={()=> auth.SignOut()}> Sign Out</button>
  )
}

