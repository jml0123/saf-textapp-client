import React, { Component } from "react";
import { Route } from "react-router-dom";
import config from "./config";

import LandingPage from "./views/LandingPage/LandingPage";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";

import Admin from "./components/Admin/Admin";

import UsersContext from "./UsersContext";

import ProfileView from "./views/ProfileView/ProfileView";

import PrivateRoute from "./utils/PrivateRoute";
import PublicOnlyRoute from "./utils/PublicOnlyRoute";
import DemoAdmin from "./components/Admin/DemoAdmin";

class App extends Component {
  state = {
    users: [],
    error: null,
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/profiles`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setTopUsers)
      .catch((error) => this.setState({ error }));
  }

  setTopUsers = (users) => {
    this.setState({
      ...this.state.error,
      users,
    });
  };

  updateUserList = (newUser) => {
    this.setState({
      ...this.state.error,
      users: [...this.state.users, newUser],
    });
  };

  render() {
    const usersContextVal = {
      users: this.state.users,
      updateUserList: this.updateUserList,
    };

    return (
      <>
        <UsersContext.Provider value={usersContextVal}>
          <Route exact path={"/"} component={LandingPage} />
          <PublicOnlyRoute path="/signup" component={SignUp} />
        </UsersContext.Provider>
        <PublicOnlyRoute path="/login" component={Login} />
        <Route path="/profile/:id" component={ProfileView} />

        <PrivateRoute path="/dashboard" component={Admin} />
        <Route path="/demo" component={DemoAdmin} />
      </>
    );
  }
}

export default App;

// integrate router
// add index.js to all components

/*




*/
