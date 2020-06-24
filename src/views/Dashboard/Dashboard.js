import React, {Component} from 'react';
import config from '../../config';
import moment from 'moment';

import { Link, Router } from 'react-router-dom';
import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageList from "../../components/MessageList/MessageList";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import TokenService from '../../services/token-service'

import MessagesContext from "../../MessagesContext"
import LoginContext from "../../LoginContext"


import "./Dashboard.css"

// Should dashboard be its own router?

export default class Dashboard extends Component {
    state = {
        messages: [],
        queuedMessages: [],
        active: [],
        editUserToggle: false,
        error: null
    }

  componentDidMount() {
    this.fetchAllData()
  }

  fetchAllData = async() => {
    const userData = await this.getUserData();
    const messages = this.getMessages(this.state.active.id);
  }

    getUserData = async () => {
      fetch(`${config.API_ENDPOINT}/users`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(user => {
          this.setActiveUser(user)
          return user
        })
        .catch(error => this.setState({ error }))
    }


    setActiveUser = active => {
      this.setState({
        ...this.state,
        active
      })
    }

    getMessages = curator_id => {
      fetch(`${config.API_ENDPOINT}/messages/curator/${curator_id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
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
          ...this.state,
          messages
        })
    }
    
    setPendingMessages = messages => {
      const queuedMessages = messages.filter(message => {
        return moment.utc(message.scheduled).format() > moment.utc().format()
      })
      this.setState({
        ...this.state,
        queuedMessages
      })
    }
    addMessage = message => {
        this.setState({
          ...this.state,
          messages: [...this.state.messages, message]
        })
    }

    deleteMessage = messageId => {
        const newMessages = this.state.messages.filter(
        message => message.id !== messageId
        )
        this.setState({
          ...this.state,
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
             ...this.state,
            messages: newMessages
        })
    }

    toggleEditView = () => {
      this.setState({
        ...this.state,
        editUserToggle: !this.state.editUserToggle
      })
      return this.state.editUserToggle
    }
    handleDeleteUser = () => {
      this.props.history.push('/')
    }
    editUser = () => {
      this.props.history.push('/dashboard')
    }
    render(){
        const MessagesContextVal = {
            messages: this.state.messages,
            deleteMessage: this.deleteMessage,
            addMessage: this.addMessage,
            editMessage: this.editMessage
          }
        const LoginContextVal = {
            active: this.state.active.user,
            toggleEditView: this.toggleEditView,
            editUser: this.editUser,
            deleteUser: this.handleDeleteUser
        }
        console.log(this.state)

        const renderMessageList = (this.state.messages !== [])?  <MessageList activeUser ={this.state.active}/> : null
        
        const editUserView = (this.state.editUserToggle)?  
          <EditUserForm 
            user = {this.state.active}
            onDeleteUser = {this.handleDeleteUser}
            toggleEditView = {this.toggleEditView}
          />
          : ""

        return (
            <>
                <LoginContext.Provider value= {LoginContextVal}>
                    <MessagesContext.Provider value= {MessagesContextVal}>
                    <header>
                        <DashNavBar user={this.state.active}/>
                    </header>
                    <main className="Dashboard">
                        {editUserView}
                        <div className="dashboard-container">
                            {renderMessageList}
                        </div>
                        <div className="scheduler-console">
                            <div className="console-btn-wrapper">
                                <Link to ={
                                  {pathname: `/create-message`,
                                   state: {activeUser: this.state.active}}}>
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