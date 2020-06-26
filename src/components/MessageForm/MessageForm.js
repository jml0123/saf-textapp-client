import React, { Component } from "react";
import moment from "moment";
import config from "../../config";
import TokenService from "../../services/token-service";

import MessagesContext from "../../MessagesContext";
import { withRouter } from "react-router-dom"; // <--- import `withRouter`. We will use this in the bottom of our file.

import "./MessageForm.css";

class MessageForm extends Component {
  static contextType = MessagesContext;
  state = {
    message: {
      content: this.props.content || "",
      scheduled: this.props.scheduled || "",
      id: this.props.id || "",
    },
    error: null,
  };

  invalidNoContent() {
    const content = this.state.message.content.trim();
    if (content.length === 0) {
      return true;
    }
  }

  invalidDate() {
    let date = moment(this.state.message.scheduled);
    date = moment(date, "YYYY-MM-DDTHH:mm:ssZ");
    const currentDate = moment().format;
    if (isNaN(date) === true) {
      //var d = new Date(date);
      return true;
    }
    //else return true;
    return date < currentDate;
  }

  disabledSubmit() {
    if (this.invalidNoContent()) {
      return true;
    }
    if (this.invalidDate()) {
      return true;
    } else return false;
  }

  parseDateTime = () => {
    const scheduled = this.state.message.scheduled;
    return scheduled.toISOString();
  };

  updateContent(messageContent) {
    this.setState({
      message: {
        scheduled: this.state.message.scheduled,
        content: messageContent,
        id: this.state.message.id,
      },
    });
  }

  updateSchedule(messageSchedule) {
    this.setState({
      message: {
        content: this.state.message.content,
        scheduled: moment(messageSchedule).local().format(),
        id: this.state.message.id,
      },
    });
    console.log(this.state.message);
  }

  // Remove once hooked up to server
  generateUniqueID = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  handleCreateMessage = (e) => {
    e.preventDefault();
    const messageContent = this.state.message.content;
    const messageScheduled = this.state.message.scheduled;
    const message = {
      scheduled: messageScheduled,
      content: messageContent,
      curator_id: this.props.activeUser.id,
    };
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/messages`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((message) => {
        this.setState({ error: null });
        // Make request here
        this.context.addMessage(message);
        this.props.history.push(this.props.demo ? "/demo" : "/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  handleEditMessage = (e) => {
    e.preventDefault();
    const messageContent = this.state.message.content;
    const messageScheduled = this.state.message.scheduled;
    const messageId = this.state.message.id;

    const newData = {
      scheduled: messageScheduled,
      content: messageContent,
      id: messageId,
    };
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/messages/${messageId}`, {
      method: "PATCH",
      body: JSON.stringify(newData),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((editedMessage) => {
        console.log(editedMessage);
        this.context.editMessage(editedMessage, this.props.id);
        this.props.history.push(this.props.demo ? "/demo" : "/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleClickCancel = () => {
    this.props.history.push(this.props.demo ? "/demo" : "/dashboard");
  };

  handleDeleteMessage(messageId) {
    if (this.props.newMessage) {
      this.props.history.push(this.props.demo ? "/demo" : "/dashboard");
      return;
    }
    fetch(`${config.API_ENDPOINT}/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res;
      })
      .then(() => {
        // No data is passed on delete
        this.context.deleteMessage(messageId);
        this.props.history.push(this.props.demo ? "/demo" : "/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const now = moment(new Date()).format("YYYY-MM-DDTHH:mm");
    const messageFormBtns = this.props.newMessage ? (
      <>
        <button
          type="button"
          disabled={this.disabledSubmit()}
          onClick={this.handleCreateMessage}
        >
          Create Message
        </button>
      </>
    ) : (
      <>
        <button
          type="button"
          onClick={this.handleEditMessage}
          disabled={this.disabledSubmit() || this.invalidDate()}
        >
          Save
        </button>
        <button type="button" onClick={this.handleClickCancel}>
          Cancel
        </button>
      </>
    );

    const activity = this.props.newMessage ? "Create Message" : "Edit";
    // const twoWeeksAway = new Date(Date.now() + 12096e5)
    // Doesn't currently work
    return (
      <div className="create-message-wrapper">
        <div className="message-header">
          <h1>{activity}</h1>
          <button
            onClick={() => this.handleDeleteMessage(this.state.message.id)}
            id="deleteBtn"
          >
            {" "}
            <img
              className="delete"
              src="https://logodix.com/logo/1154262.png"
              alt="Delete"
            />
          </button>
        </div>
        <form className="create-message" id="message-form">
          <label htmlFor="content">What do you want your message to say?</label>
          <textarea
            id="content"
            rows="4"
            cols="40"
            form="message-form"
            onChange={(e) => this.updateContent(e.target.value)}
            defaultValue={this.state.message.content}
            placeholder="Engage your base"
          ></textarea>
          <label htmlFor="scheduled">Schedule for</label>
          <input
            type="datetime-local"
            id="scheduled"
            onChange={(e) => this.updateSchedule(e.target.value)}
            // Unclear why below is required to access the property ??
            defaultValue={moment(this.state.message.scheduled).format(
              "YYYY-MM-DD[T]HH:mm:ss"
            )}
            placeholder={now}
            min={Date.now()}
          />
          <div className="btn-row">{messageFormBtns}</div>
        </form>
      </div>
    );
  }
}

export default withRouter(MessageForm);
