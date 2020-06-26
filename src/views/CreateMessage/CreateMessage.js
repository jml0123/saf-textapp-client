import React, { Component } from "react";

import MessageForm from "../../components/MessageForm/MessageForm";
import "./CreateMessage.css";

export default class CreateMessage extends Component {
  state = {
    activeUser: this.props.active,
  };
  render() {
    return (
      <>
        <MessageForm
          newMessage={true}
          activeUser={this.state.activeUser}
          demo={this.props.demo}
        />
      </>
    );
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
