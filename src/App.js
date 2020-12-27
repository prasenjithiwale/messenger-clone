import { useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase'
import firebase from 'firebase'

function App() {
  const [messages, setMessages] = useState([{username:'Prasenjit',message:'Hola Personas!'}]);

  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');


  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => doc.data()))
    });
  },[]);

  useEffect(() =>{
    setUsername(prompt('Please enter your username'));
  }, []);

  console.log(messages);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //setMessages([...messages, {username:username, message: input}]);
    setInput('');
  }

  return (
    <div className="App">
    <h1>This is messenger app</h1>
  <h2>Welcome {username}</h2>


    <FormControl>
      <InputLabel>Enter A Message</InputLabel>
      <Input value = {input} onChange={ event => setInput(event.target.value)} />
      <Button type="submit" disabled={!input} variant='contained' color='primary' onClick={sendMessage}>Send Message</Button>
    </FormControl>

    {
      messages.map(message =>(
        <Message text={message} usr={username}/>
      ))
    }
    </div>
  );
}

export default App;
