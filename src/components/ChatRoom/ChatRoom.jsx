import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore, auth } from '../../utils/firebase'
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
  const [query, setQuery] = useState(
    messagesRef.orderBy('createdAt',"desc").limit(10)
  )

  
  // we can update the data our app in real time whenever there is any update in the firestore database
  // with this useCollectionData hook. It returns an array of object, where each object is the chat message in the db.
  // And anytime the data changes, react will rerender with the latest data.
  const [messages] = useCollectionData(query, { idField: 'id' });
  


  const [formValue, setFormValue] = useState('');
  
  



  // refetching the data from firebase when the user has scrolled up to the top
  const [no_of_texts, set_no_of_texts] = useState(5)

  const callAnotherTenTexts = async() => {

    const snapshot = await messagesRef.get()
    let cursize = snapshot.size

    if (no_of_texts - 5 > cursize){
      return
    }
    let newQuery = messagesRef.orderBy('createdAt',"desc").limit(no_of_texts);
    setQuery(newQuery)
    console.log('Scrolled to the top of the section',no_of_texts);
  };
  
  useEffect(() => {
    callAnotherTenTexts();
  }, [no_of_texts]); 
  
  
  
  
  // handling when reached to the top
      const sectionRef = useRef(null);
      useEffect(() => {
        function handleScroll() {
          const section = sectionRef.current;
          if (section) {
            const isAtTop = section.scrollTop === 0;
            if (isAtTop) {
              set_no_of_texts((prevNoOfTexts) => prevNoOfTexts + 10);
            }
          }
        }
    
        // Attach the scroll event listener when the component mounts
        const section = sectionRef.current;
        if (section) {
          section.addEventListener('scroll', handleScroll);
        }
    
        // Clean up the event listener when the component unmounts
        return () => {
          if (section) {
            section.removeEventListener('scroll', handleScroll);
          }
        };
      }, []); // Empty dependency array ensures that this effect runs once on mount
    

    
  
  
  
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
    dummy.current.scrollIntoView({ block: "end", inline: "nearest" , behavior: "auto"});
  }
  
  const dummy = useRef();
  return (<>
    <main>

    <div ref={sectionRef} style={{ height: '400px', overflow: 'auto' }}>
      { messages && messages.toReversed().map(msg => <ChatMessage key={msg.uniqueId} message={msg}/>)}

      {/* this empty span is referenced by the useRef hook, so everytime we send something we call the scrollIntoView function on this dummy ref.*/}
      <span ref={dummy}></span>
</div>
    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} style={{fontFamily: 'inherit'}}
      onChange={(e) => setFormValue(e.target.value)} placeholder="Message" />

      <button type="submit" disabled={!formValue}><AiOutlineSend/></button>

    </form>
  </>)
}

export default ChatRoom
