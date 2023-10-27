import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore, auth } from '../../App'
import { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import firebase from 'firebase/compat/app'
import { AiOutlineSend } from "react-icons/ai";
import './styles.css'
import { v4 as uuidv4 } from "uuid";

function ChatRoom() {
  
  // in firestore, we have a collection of messages, whenever an user texts anything, it gets added to the collection.
  // here we are making a reference to that point at our db.
  const messagesRef = firestore.collection('texts');
  
  // now we are ordering the doc by the parameter createdAt, and limit it to 25 results
  // desc to fetch the latest texts first, we will reverse the resulting array while rendering 
  const query = messagesRef.orderBy('createdAt',"desc").limit(3);
  
  // we can update the data our app in real time whenever there is any update in the firestore database
  // with this useCollectionData hook. It returns an array of object, where each object is the chat message in the db.
  // And anytime the data changes, react will rerender with the latest data.
  const [messages] = useCollectionData(query, { idField: 'id' });
  
  
  const [formValue, setFormValue] = useState('');
  
  
  
  
  
  const sendMessage = async (e) => {
    e.preventDefault(); //stops the app from refreashing everytime a text is sent
    
    const { uid, photoURL } = auth.currentUser;
    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      uniqueId: uuidv4()
    })
    
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  
  const dummy = useRef();
  return (<>
    <main>

      {messages && messages.toReversed().map(msg => <ChatMessage key={msg.uniqueId} message={msg}/>)}

      {/* this empty span is referenced by the useRef hook, so everytime we send something we call the scrollIntoView function on this dummy ref.*/}
      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} style={{fontFamily: 'inherit'}}
      onChange={(e) => setFormValue(e.target.value)} placeholder="Message" />

      <button type="submit" disabled={!formValue}><AiOutlineSend/></button>

    </form>
  </>)
}

export default ChatRoom