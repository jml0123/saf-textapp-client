import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import config from './config';

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
    users: [],
      error: null
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/profiles`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setTopUsers)
      .catch(error => this.setState({ error }))
      //console.log(this.state.users)
  }

  setTopUsers = users => {
    this.setState({
      users,
      error: null
    })
  }

  render() {
    const usersContextVal = {
      users: this.state.users,
    }

    //console.log(this.state)

    return (
      <>
        <UsersContext.Provider value = {usersContextVal}>
            <Route
              exact path='/'
              component={LandingPage}
            />
        </UsersContext.Provider>
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
      </>
    );
  }
}

export default App;

// integrate router
// add index.js to all components

/*




*/