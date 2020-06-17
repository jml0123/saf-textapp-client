import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import LandingPage from "./views/LandingPage/LandingPage"
import Login from "./views/Login/Login"
import SignUp from "./views/SignUp/SignUp"
import Dashboard from "./views/Dashboard/Dashboard"
import CreateMessage from "./views/CreateMessage/CreateMessage"
class App extends Component {
  render() {
    return (
      <>
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
            path='/edit-message'
            component={Dashboard}
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
