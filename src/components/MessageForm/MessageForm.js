import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MessagesContext from "../../MessagesContext"
import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

import "./MessageForm.css"

class MessageForm extends Component {
    static contextType = MessagesContext
    state = {
        message: {
            content: "",
            scheduled: "",
            id: this.props.id,
        },
        error: null
    }

    componentDidMount() {
        if (!this.props.newMessage) {
            this.setState({
                message: {
                    content: this.props.content,
                    scheduled: this.props.scheduled,
                    id: this.props.id,
                },
                error: null
            })
        }
    }

    invalidNoContent() {
        const content = this.state.message.content.trim();
        if (content.length === 0) {
          return true
        }
    }

    invalidDate() {
        const date = Date.parse(this.state.message.scheduled);
        const currentDate = Date.now();
        if (isNaN(date) === false) {
            var d = new Date(date);
        }
        else return true;
        return (d < currentDate);
    }
    
    disabledSubmit() {
        if(this.invalidNoContent()) {
            return true
        }
        if(this.invalidDate()){
            return true
        }
        else return false
    }

    parseDateTime = () => {
        const scheduled = this.state.message.scheduled;
        return (scheduled.toISOString())
    }

    updateContent(messageContent) {
        this.setState({message: {
            scheduled: this.state.message.scheduled, content: messageContent
        }});
    }

    updateSchedule(messageSchedule) {
        this.setState({message: {
            content: this.state.message.content, scheduled: messageSchedule
            }
        });
    }

    // Remove once hooked up to server
    generateUniqueID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    
    handleCreateMessage = e => {
        e.preventDefault()

        const message = {
            scheduled: this.state.message.content,
            content: this.state.message.scheduled,
            id: this.generateUniqueID(),
        }

        this.setState({error: null});
        // Make request here
        this.context.addMessage(message);
        this.props.back();
    }


    handleEditMessage = e => {
        e.preventDefault()

        const newData = {
            scheduled: this.state.message.content,
            content: this.state.message.scheduled,
            id: this.state.message.id,
        }
        console.log(this.props.id)
        this.setState({error: null});

        // Make request here
        this.context.editMessage(newData, this.props.id)
        this.props.history.push('/dashboard');
    }


    handleClickCancel = () => {
        this.props.history.push('/dashboard')
    }

    handleDeleteMessage(messageId) {
        // Add Requests here
        this.context.deleteMessage(messageId);
        this.props.history.push('/dashboard');
    }

    render(){

        // Handle submit on Save and on Create
        // Push history on cancel
        const newMessageBtns = (this.props.newMessage)?  <> 
            <button 
                type="button" 
                disabled={this.disabledSubmit()}
                onClick={this.handleCreateMessage}>
                Create Message
            </button> 
        </>
            : <>
                <button type="button"  onClick={this.handleEditMessage} disabled={this.disabledSubmit() || this.invalidDate()}>Save</button>
                <Link to ="/dashboard"><button type="button">Cancel</button></Link>
            </>
           
        const activity = (this.props.newMessage)? "Create Message" : "Edit";
        const twoWeeksAway = new Date(Date.now() + 12096e5)

        return (
            <div className="create-message-wrapper">
            <div className="message-header">
                <h1>{activity}</h1> 
                <button onClick={() => this.handleDeleteMessage(this.state.message.id)} id="deleteBtn"> <img className="delete" src="https://logodix.com/logo/1154262.png" alt="Delete" /></button>
            </div>
                <form className="create-message" id="message-form">
                    <label htmlFor="content">What do you want your message to say?</label>
                    <textarea 
                        id="content" 
                        rows="4" 
                        cols="40" 
                        form="message-form" 
                        onChange = {e => this.updateContent(e.target.value)}
                        defaultValue={this.state.message.content}
                    ></textarea>
                    <label htmlFor="scheduled">Schedule for</label>
                    <input 
                        type="datetime-local" 
                        id="scheduled" 
                        onChange = {e => this.updateSchedule(e.target.value)} 
                        // Unclear why below is required to access the property ??
                        defaultValue={this.state.message.scheduled}
                        min={Date.now()}
                        max={twoWeeksAway}

                    />
                    <div className="btn-row">
                        {newMessageBtns}
                    </div>
                </form>
            </div>
        )
    }
}


export default withRouter(MessageForm);