import React, {Component} from 'react';
import config from '../../config';
import moment from 'moment';

import { Link, Router } from 'react-router-dom';
import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageList from "../../components/MessageList/MessageList";

import MessagesContext from "../../MessagesContext"
import LoginContext from "../../LoginContext"


import "./Dashboard.css"

// Should dashboard be its own router?

export default class Dashboard extends Component {
    state = {

        messages: [],
        // Messages state should rest in dashboard
        queuedMessages: [],
  
        // Active state should rest in dashboard
        active: {
            user: {
                id: 1,
                username: "jayjay@email.com",
                full_name: "Jay Jay Client side",
                profile_img_link: "https://pbs.twimg.com/profile_images/1153833970112454656/mR3L_Hxa.png",
                profile_description: "Testing client side"
            }
        }, 
        error: null
    }
    
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/messages/curator/${this.state.active.user.id}`, {
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
      .then(messages => {
        this.setMessages(messages)
        this.setPendingMessages(messages)
      })
      .catch(error => this.setState({ error }))
    }

    setMessages = messages => {
        this.setState({
          messages,
          error: null
        })
    }
    
    setPendingMessages = messages => {
      const queuedMessages = messages.filter(message => {
        return moment.utc(message.scheduled).format() > moment.utc().format()
      })
      this.setState({
        queuedMessages,
        error: null
      })
    }
      
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
    
    render(){

        console.log(this.state)

        const MessagesContextVal = {
            messages: this.state.messages.filter(message => message.curator_id === this.state.active.user.id),
            deleteMessage: this.deleteMessage,
            addMessage: this.addMessage,
            editMessage: this.editMessage
          }
        const LoginContextVal = {
            active: this.state.active.user
        }
        console.log(this.state) 
        return (
            <>
                <LoginContext.Provider value= {LoginContextVal}>
                    <MessagesContext.Provider value= {MessagesContextVal}>
                    <header>
                        <DashNavBar user={this.state.active.user}/>
                    </header>
                    <main className="Dashboard">
                        <div className="dashboard-container">
                            <MessageList activeUser ={this.state.active.user}/>
                        </div>
                        <div className="scheduler-console">
                            <div className="console-btn-wrapper">
                                <Link to ={
                                  {pathname: `/create-message`,
                                   state: {activeUser: this.state.active.user}}}>
                                    <button type="button">
                                        New Message
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </main>
                    </MessagesContext.Provider>
                </LoginContext.Provider>
            </>
        )
    }
}