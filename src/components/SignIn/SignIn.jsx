import firebase from 'firebase/compat/app'
import { auth } from '../../App'
import { AiOutlinePoweroff } from "react-icons/ai";
import './styles.css'
function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle} 
      style={{fontFamily: 'inherit'}}>Sign in with Google</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}
      style={{fontFamily:'inherit'}}><AiOutlinePoweroff/></button>
  )
}

export {SignIn,SignOut}

