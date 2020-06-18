import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import LandingPage from "./views/LandingPage/LandingPage"
import Login from "./views/Login/Login"
import SignUp from "./views/SignUp/SignUp"
import Dashboard from "./views/Dashboard/Dashboard"
import CreateMessage from "./views/CreateMessage/CreateMessage"
import EditMessage from "./views/EditMessage/EditMessage"

import MessagesContext from "./MessagesContext"
import UsersContext from "./UsersContext"
import LoginContext from "./LoginContext"

import ProfileView from './views/ProfileView/ProfileView';

class App extends Component {

  state = {
      messages: [
        {
            scheduled: "2020-06-18T09:00",
            content: "Donate to Lorem Ipsum Dolor",
            id: 1,
            curator_id: 1,
        },
        {
          scheduled: "2020-06-18T11:00",
          content: "Read this",
          id: 4,
          curator_id: 1,
      },
        
        {
            scheduled: "2020-06-22T09:00",
            content: "Take Care of yourself during a revolution",
            id: 2,
            curator_id: 1,
        },
        {
            scheduled: "2020-06-26T09:00",
            content: "What to wear during today's protest",
            id: 3,
            curator_id: 1,
        },
        {
          scheduled: "2020-06-26T09:00",
          content: "Hello World",
          id: 5,
          curator_id: 2,
      },
      ],
    active: {
      user: {
        name: "Rodney Wyatt",
        profileImg: "https://image.flaticon.com/icons/png/128/168/168730.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        id: 1
      }
    },
    users: [
      {
          name: "John Doe",
          profileImg: "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
          id: 3
      },
      {
          name: "Jane Doe",
          profileImg: "https://thumbs.dreamstime.com/b/punk-girl-avatar-violet-hair-flat-74541226.jpg",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
          id: 2,
      },
      {
          name: "Rodney Wyatt",
          profileImg: "https://image.flaticon.com/icons/png/128/168/168730.png",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
          id: 1
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
  
    const messageContextVal = {
      messages: this.state.messages.filter(message => message.curator_id === this.state.active.user.id),
      deleteMessage: this.deleteMessage,
      addMessage: this.addMessage,
      editMessage: this.editMessage
    }

    const usersContextVal = {
      users: this.state.users,
    }

    const LoginContextVal = {
      active: this.state.active
    }
    //console.log(this.state)

    return (
      <>
        <UsersContext.Provider value = {usersContextVal}>
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
            path='/profile/:id'
            component={ProfileView}
          />
      </UsersContext.Provider>
      <MessagesContext.Provider value = {messageContextVal}>
          <LoginContext.Provider value = {LoginContextVal}>
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
          </LoginContext.Provider>
        </MessagesContext.Provider>
      </>
    );
  }
}

export default App;

// integrate router
// add index.js to all components
