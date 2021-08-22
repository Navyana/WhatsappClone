import React, { useState } from 'react'
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoodIcon from '@material-ui/icons/Mood';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios.js';

function Chat({messages}) {
    const [input, setInput] = useState("");

    const sendMessage = (e) =>{
        e.preventDefault();

        axios.post('/messages/new',{
            message:input,
            name:"valli",
            timestamp:"now",
            received: true
        });
        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Satya</h3>
                    <p>Last seen at....</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>    
            </div>
            <div  className="chat__body">
                {messages.map((message) => {
                    return(
                    <p className={`chat__message ${message.received && "chat__receive"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat_timeStamp">
                        {message.timestamp}
                    </span>
                    </p>)
                })} 
            </div>
            <div className="chat__footer">
                <MoodIcon />
                <IconButton>
                        <AttachFileIcon />
                </IconButton>
                <form>
                    <input
                      value = {input}
                      onChange ={(e) => setInput(e.target.value)}
                      placeholder="Type a message"
                      type="text"
                    />
                    <button onClick = {sendMessage}type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
