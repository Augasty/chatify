import ChatRoom from './components/ChatRoom/ChatRoom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SignIn, SignOut } from './components/SignIn/SignIn'
import { AiOutlineEdit } from "react-icons/ai";
import { auth } from './utils/firebase';



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
