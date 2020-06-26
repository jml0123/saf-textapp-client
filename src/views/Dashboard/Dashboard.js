import React, { Component } from "react";
import { Link } from "react-router-dom";

import MessageList from "../../components/MessageList/MessageList";
import MessagesContext from "../../MessagesContext";

import "./Dashboard.css";

export default class Dashboard extends Component {
  static contextType = MessagesContext;

  render() {
    const newMessage = this.props.demo
      ? "demo/create-message"
      : "dashboard/create-message";

    return (
      <>
        <div className="messages-container">
          <MessageList
            activeUser={this.props.active}
            demo={this.props.demo ? true : false}
          />
        </div>
        <div className="scheduler-console">
          <div className="console-btn-wrapper">
            <Link to={newMessage}>
              <button type="button">New Message</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
