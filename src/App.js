import { useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel, IconButton } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [messages, setMessages] = useState([{username:'Prasenjit',message:'Hola Personas!'}]);

  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
  },[]);

  useEffect(() =>{
    setUsername(prompt('Please enter your username'));
  }, []);

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
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"></img>
    <h1>This is messenger app</h1>
  <h2>Welcome {username}</h2>
  <form className="app__form">
    <FormControl className="app_formControl">
      <Input className="app__input" value = {input} onChange={ event => setInput(event.target.value)} placeholder="Enter a message..." />
      <IconButton className="app_iconButton" type="submit" disabled={!input} variant='contained' color='primary' onClick={sendMessage}>
        <SendIcon/>
      </IconButton>
    </FormControl>
  </form>

        <FlipMove>
          {
            messages.map(({id, message}) =>(
              <Message key={id} msg={message} user={username} />
            ))
          }
        </FlipMove>
    </div>
  );
}

export default App;
