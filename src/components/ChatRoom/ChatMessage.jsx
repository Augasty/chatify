/* eslint-disable react/prop-types */
import { auth } from "../../utils/firebase";

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    // for every message on the screen this ChatMessage function will render.
    // if the uid of a message is same as the current author's uid, 
    // the messageClass is 'sent', otherwise the messageClass is 'received'
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }

export default ChatMessage