import React, {Component} from 'react';
import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageForm from "../../components/MessageForm/MessageForm";

import LoginContext from "../../LoginContext"

import "./EditMessage.css"

export default class EditMessage extends Component{
    state = {
        content: this.props.location.state.content,
        scheduled: this.props.location.state.scheduled,
        id: this.props.location.state.messageId,
        activeUser:  this.props.location.state.activeUser,
    }

    render(){
    console.log(this.state)
    return (
        <LoginContext.Consumer> 
            {active => (
                <>
                <header>
                    <DashNavBar user = {this.state.activeUser}/>
                </header>
                <main className="dashboard">
                    <MessageForm 
                        content = {this.state.content} 
                        scheduled = {this.state.scheduled} 
                        id={this.state.id}
                        activeUser = {this.state.activeUser}
                        />  
                </main>
                </>
            )}
        </LoginContext.Consumer> 
    )
    }
}
