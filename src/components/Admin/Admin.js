import React, { Component } from "react";
import { Switch } from "react-router-dom";
import config from "../../config";
import moment from "moment";
import TokenService from "../../services/token-service";
import PrivateRoute from "../../utils/PrivateRoute";

import DashNavBar from "../../components/NavBarDash/NavBarDash";
import EditUserForm from "../../components/EditUserForm/EditUserForm";

import CreateMessage from "../../views/CreateMessage/CreateMessage";
import Dashboard from "../../views/Dashboard/Dashboard";
import EditMessage from "../../views/EditMessage/EditMessage";

import MessagesContext from "../../MessagesContext";
import LoginContext from "../../LoginContext";

import "./Admin.css";

export default class Admin extends Component {
  state = {
    messages: [],
    queuedMessages: [],
    active: [],
    editUserToggle: false,
    error: null,
    loaded: false,
  };

  async componentDidMount() {
    await this.getUserData();
    await this.getMessages(this.state.active.id);
    this.setState({
      ...this.state,
      loaded: true,
    });
  }

  getUserData = async () => {
    fetch(`${config.API_ENDPOINT}/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((user) => {
        this.setActiveUser(user);
        return user;
      })
      .catch((error) => this.setState({ error }));
  };

  setActiveUser = (active) => {
    this.setState({
      ...this.state,
      active,
    });
  };

  getMessages = async (curator_id) => {
    fetch(`${config.API_ENDPOINT}/messages/curator/${curator_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((messages) => {
        this.setMessages(messages);
        this.setPendingMessages(messages);
      })
      .catch((error) => this.setState({ error }));
  };

  setMessages = (messages) => {
    this.setState({
      ...this.state,
      messages,
    });
  };

  setPendingMessages = (messages) => {
    const queuedMessages = messages.filter((message) => {
      return moment.utc(message.scheduled).format() > moment.utc().format();
    });
    this.setState({
      ...this.state,
      queuedMessages,
    });
  };
  addMessage = (message) => {
    this.setState({
      ...this.state,
      messages: [...this.state.messages, message],
    });
  };

  deleteMessage = (messageId) => {
    const newMessages = this.state.messages.filter(
      (message) => message.id !== messageId
    );
    this.setState({
      ...this.state,
      messages: newMessages,
    });
  };

  editMessage = (newData, id) => {
    const newMessages = this.state.messages.map((msg) =>
      msg.id === id ? newData : msg
    );
    this.setState({
      ...this.state,
      messages: newMessages,
    });
  };

  toggleEditView = () => {
    this.setState({
      ...this.state,
      editUserToggle: !this.state.editUserToggle,
    });
  };

  handleDeleteUser = () => {
    this.props.history.push("/");
  };
  editUser = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const MessagesContextVal = {
      messages: this.state.messages,
      deleteMessage: this.deleteMessage,
      addMessage: this.addMessage,
      editMessage: this.editMessage,
    };
    const LoginContextVal = {
      active: this.state.active.user,
      toggleEditView: this.toggleEditView,
      editUser: this.editUser,
      deleteUser: this.handleDeleteUser,
    };

    const editUserView = this.state.editUserToggle ? (
      <EditUserForm
        user={this.state.active}
        onDeleteUser={this.handleDeleteUser}
        toggleEditView={this.toggleEditView}
      />
    ) : (
      ""
    );

    if (!this.state.loaded) {
      return <div />;
    }

    return (
      <>
        <header>
          <DashNavBar
            user={this.state.active}
            toggleEditView={this.toggleEditView}
          />
        </header>
        <main className="Dashboard">
          {editUserView}
          <LoginContext.Provider value={LoginContextVal}>
            <MessagesContext.Provider value={MessagesContextVal}>
              <PrivateRoute
                exact
                path="/dashboard"
                component={() => <Dashboard active={this.state.active} />}
              />
              <Switch>
                <PrivateRoute
                  exact
                  path="/dashboard/edit-message/:id"
                  component={EditMessage}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/create-message"
                  component={() => <CreateMessage active={this.state.active} />}
                />
              </Switch>
            </MessagesContext.Provider>
          </LoginContext.Provider>
        </main>
      </>
    );
  }
}
