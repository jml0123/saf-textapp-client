import React, {Component} from 'react';

import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageForm from "../../components/MessageForm/MessageForm";

import LoginContext from "../../LoginContext"

import "./CreateMessage.css"

export default class CreateMessage extends Component {
    state = {
        activeUser: this.props.active
    }
    render () {   
        return (   
            <>
                <MessageForm 
                    newMessage={true}
                    activeUser={this.state.activeUser}/>  
        
            </>
        )
    }
}

/*

<LoginContext.Consumer> 
                {active => (
                    <>
                
                        <MessageForm 
                            newMessage={true}
                            activeUser={this.state.activeUser}/>  
             
                    </>
                )}  
            </LoginContext.Consumer>
            */