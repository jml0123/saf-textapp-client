import React, {Component} from 'react';

import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageForm from "../../components/MessageForm/MessageForm";
import "./CreateMessage.css"

export default function EditMessage(){
    return (
        <div className="dashboard">
            <div className="create-message-wrapper">
            <div className="message-header">
                <h1>Edit</h1> 
                <a href="dashboard.html"><img className="delete" src="https://logodix.com/logo/1154262.png" /></a>
            </div>
                <MessageForm/>
            </div>
        </div>
    )
}
