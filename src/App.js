import { useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Message from './Message';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{username:'Prasenjit',txt:'Hola Personas!'}]);
  const [username, setUsername] = useState('');

  useEffect(() =>{
    setUsername(prompt('Please enter your username'));
  }, []);

  console.log(messages);

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, {username:username, txt: input}]);
    setInput('');
  }

  return (
    <div className="App">
    <h1>This is messenger app</h1>
  <h2>Welcome {username}</h2>


    <FormControl>
      <InputLabel>Enter A Message</InputLabel>
      <Input value = {input} onChange={ event => setInput(event.target.value)} />
      <Button type='submit' disabled={!input} variant='contained' color='primary' onClick={sendMessage}>Send Message</Button>
    </FormControl>

    {
      messages.map(message =>(
        <Message text={message}/>
      ))
    }
    </div>
  );
}

export default App;
