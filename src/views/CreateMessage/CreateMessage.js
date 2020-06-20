import React, {Component} from 'react';

import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageForm from "../../components/MessageForm/MessageForm";

import LoginContext from "../../LoginContext"

import "./CreateMessage.css"

export default class CreateMessage extends Component {
    state = {
        activeUser: this.props.location.state.activeUser
    }
    render () {   
      
        return (
            <LoginContext.Consumer> 
                {active => (
                    <>
                    <header>
                        <DashNavBar user={active}/>
                    </header>
                    <main className="dashboard">
                        <MessageForm 
                            newMessage={true}
                            activeUser={this.state.activeUser}/>  
                    </main>
                    </>
                )}  
            </LoginContext.Consumer>
        
        )
    }
}