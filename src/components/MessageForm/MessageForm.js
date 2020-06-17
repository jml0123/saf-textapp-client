import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import "./MessageForm.css"

export default class MessageForm extends Component {
    render(){
        // Handle submit on Save and on Create
        // Push history on cancel
        const newMessageBtns = (this.props.newMessage)?  <><button type="button">Create Message</button> </>
            : <>
                <button type="button">Save</button>
                <button type="button">Cancel</button>
            </>
           
        const activity = (this.props.newMessage)? "Create Message" : "Edit";

        return (
            <div className="create-message-wrapper">
            <div className="message-header">
                <h1>{activity}</h1> 
                <Link to="/dashboard"><img className="delete" src="https://logodix.com/logo/1154262.png" /></Link>
            </div>
                <form className="create-message" id="message-form">
                    <label for="content">What do you want your message to say?</label>
                    <textarea id="content" rows="4" cols="40" form="message-form"></textarea>
                    <label for="scheduled">Schedule for</label>
                    <input type="datetime" id="scheduled" />
                    <div className="btn-row">
                        {newMessageBtns}
                    </div>
                </form>
            </div>
        )
    }
}
