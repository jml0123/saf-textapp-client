import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import "./MessageList.css"

export default class MessageList extends Component {
    render(){
    
        const messages = (this.props.messages).map(message => {
            const date = (message.date === Date.now()) ? "Today"
                : (message.date === Date.now() + 1) ? "Tomorrow"
                : message.date;
            // Put below in a separate component!
            return (
                    <>
                    <Link to="/edit-message/:id">
                        <p class="day-label">{date}</p>
                        <ul>
                            <li>
                                <a href="edit-message.html">
                                    <div class="message-preview-container">
                                        {message.content}
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </Link>
                    </>
            )
        })  
        return (
            <div class="scheduled">
                <h1>Scheduled messages</h1>
                    <div class="scheduled-content-container">
                        {messages}
                    </div>
            </div>
        )
    }
}


// Client should parse object and group by date e.g.

/*
Date1: {
    [
        message: {},
        message: {},
    ]
},

Date2: {
      [
        message: {},
        message: {},
    ]
}
*/

MessageList.defaultProps = {
    messages: [
        {
            date: "Monday",
            content: "Donate to Lorem Ipsum Dolor"
        },
        {
            date: "Wednesday",
            content: "Take Care of yourself during a revolution"
        },
        {
            date: "Saturday",
            content: "What to wear during today's protest"
        },
    ]
}