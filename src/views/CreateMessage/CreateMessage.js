import React from 'react';

import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageForm from "../../components/MessageForm/MessageForm";

import LoginContext from "../../LoginContext"

import "./CreateMessage.css"

export default function CreateMessage(props){
    return (
        <LoginContext.Consumer> 
            {active => (
                 <>
                <header>
                    <DashNavBar user={active}/>
                </header>
                <main className="dashboard">
                    <MessageForm newMessage={true} user={active}/>  
                </main>
                </>
            )}  
        </LoginContext.Consumer>
       
    )
}
