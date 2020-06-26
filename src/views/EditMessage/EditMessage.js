import React, { Component } from "react";

import MessageForm from "../../components/MessageForm/MessageForm";
import "./EditMessage.css";

export default class EditMessage extends Component {
  state = {
    content: this.props.location.state.content,
    scheduled: this.props.location.state.scheduled,
    id: this.props.location.state.messageId,
    activeUser: this.props.location.state.activeUser,
    demo: this.props.location.state.demo,
  };

  render() {
    return (
      <MessageForm
        content={this.state.content}
        scheduled={this.state.scheduled}
        id={this.state.id}
        activeUser={this.state.activeUser}
        demo={this.state.demo}
      />
    );
  }
}
