import './App.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import ChatRoom from './components/ChatRoom/ChatRoom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SignIn, SignOut } from './components/SignIn/SignIn'
import { AiOutlineEdit } from "react-icons/ai";


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


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1 style={{marginLeft:'5px'}} >Chatify <AiOutlineEdit/></h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}



export default App;
