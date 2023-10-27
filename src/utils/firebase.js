
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

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
  
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();