import React, {Component} from 'react';

import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageForm from "../../components/MessageForm/MessageForm";
import "./CreateMessage.css"

export default function CreateMessage(){
    return (
        <>
        <header>
            <DashNavBar/>
        </header>
         <main className="Dashboard">
            <MessageForm newMessage={true}/>    
        </main>
        </>
    )
}
