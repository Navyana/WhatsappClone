import React from 'react'
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';

function SidebarChat() {
    return (
        <div>
            <div className="sidebarChat">
                <Avatar/>
                <div className="sidebarChat__info">
                    <h2>Satya</h2>
                    <p>Haha</p>
                </div>
            </div>
            <div className="sidebarChat">
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvR2EmeDnAttbXXbBr_HtCX1qjGmUoSlP1_Q&usqp=CAU"/>
                <div className="sidebarChat__info">
                    <h2>Kasyap</h2>
                    <p>Haa</p>
                </div>
            </div>
            <div className="sidebarChat">
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR0r4Sg3R1lAJ3sLMG8cf55ezXaV09GEWhGw&usqp=CAU"/>
                <div className="sidebarChat__info">
                    <h2>Anju</h2>
                    <p>Avunu</p>
                </div>
            </div>
        </div>
        
    )
}

export default SidebarChat;
