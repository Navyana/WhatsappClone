import React,{ useEffect,useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js'
import axios from './axios.js';

function App() {

  const [messages, setmessages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      console.log(response.data)
      setmessages(response.data)
    })
  }, [])
  
  useEffect(() => {
    const pusher = new Pusher('4e52e57cedd7629d1bd4', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('message');
    channel.bind('inserted', function(newMessage) {
      setmessages([...messages, newMessage])
    });


  }, [messages]);


  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
