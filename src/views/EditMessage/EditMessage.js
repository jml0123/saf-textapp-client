import React, {Component} from 'react';
import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageForm from "../../components/MessageForm/MessageForm";

import "./EditMessage.css"

export default class EditMessage extends Component{
    state = {
        content: this.props.location.state.content,
        scheduled: this.props.location.state.scheduled,
        id: this.props.location.state.id
    }

    render(){


    return (
        <>
        <header>
            <DashNavBar/>
        </header>
        <main className="dashboard">
            <MessageForm 
                content = {this.state.content} 
                scheduled = {this.state.scheduled} 
                id={this.state.id}
                onDelete={this.handleDeleteMessage}
                back={this.backToDashboard}
                />  
        </main>
        </>
    )
    }
}
