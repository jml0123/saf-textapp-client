import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import LandingPage from "./views/LandingPage/LandingPage"
import Login from "./views/Login/Login"
import SignUp from "./views/SignUp/SignUp"
import Dashboard from "./views/Dashboard/Dashboard"
import CreateMessage from "./views/CreateMessage/CreateMessage"
import EditMessage from "./views/EditMessage/EditMessage"

import MessagesContext from "./MessagesContext"

class App extends Component {

  state = {
      messages: [
        {
            scheduled: "2020-06-18T09:00",
            content: "Donate to Lorem Ipsum Dolor",
            id: 1
        },
        {
          scheduled: "2020-06-18T11:00",
          content: "Read this",
          id: 4
      },
        
        {
            scheduled: "2020-06-22T09:00",
            content: "Take Care of yourself during a revolution",
            id: 2,
        },
        {
            scheduled: "2020-06-26T09:00",
            content: "What to wear during today's protest",
            id: 3,
        },
      ],
      error: null
  };

  addMessage = message => {
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  deleteMessage = messageId => {
    const newMessages = this.state.messages.filter(
      message => message.id !== messageId
    )
    this.setState({
      messages: newMessages
    })
  }

  editMessage = (newData, id) => {
    const newMessages = this.state.messages.map(msg => 
      (msg.id === id)
      ? newData
      : msg
    )
    this.setState({
      messages: newMessages
    })
  }

  render() {
  
    const contextVal = {
      messages: this.state.messages,
      deleteMessage: this.deleteMessage,
      addMessage: this.addMessage,
      editMessage: this.editMessage
    }

    //console.log(this.state)

    return (
      <>
      <MessagesContext.Provider value = {contextVal}>
          <Route
            exact path='/'
            component={LandingPage}
          />
          <Route
            path='/signup'
            component={SignUp}
          />
           <Route
            path='/login'
            component={Login}
          />
           <Route
            path='/dashboard'
            component={Dashboard}
          />
           <Route
            path='/edit-message/:id'
            component={EditMessage}
          />
          <Route
            path='/create-message'
            component={CreateMessage}
          />
        </MessagesContext.Provider>
      </>
    );
  }
}

export default App;

// integrate router
// add index.js to all components
