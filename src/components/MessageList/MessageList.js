import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MessagesContext from "../../MessagesContext"
import monthNames from "../../utils/Months"
import dayNames from "../../utils/Days"

import "./MessageList.css"

export default class MessageList extends Component {
    
    static contextType = MessagesContext;

    // Add Date functions to one file
    isToday = (date) => {
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };
    isTomorrow = (date) => {
        const tomorrow = new Date()
        return date.getDate() === tomorrow.getDate() + 1 &&
            date.getMonth() === tomorrow.getMonth() &&
            date.getFullYear() === tomorrow.getFullYear();
    };

    convertToString = (date) => {
        const d = new Date(`${date} 00:00`);

        if (this.isToday(d)) {
            return "Today"
        }

        if (this.isTomorrow(d)) {
            return "Tomorrow"
        }
        return `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${(d.getDate())}`
    }

    render(){
        let dates = []
        let messageGroup = {}
        const getDates = () => {
            (this.context.messages).forEach(message =>{
                const dateWithoutTime= message.scheduled.split("T")[0]
                if(!dates.includes(dateWithoutTime)) {
                    dates = [...dates, dateWithoutTime]
                }})
                dates.sort();
        }
        getDates();

        messageGroup = dates.reduce((date1, date2) => (date1[date2] = [], date1), {});
        
        (this.context.messages).forEach(message =>{
            const dateWithoutTime= message.scheduled.split("T")[0]
            return (
                messageGroup[dateWithoutTime] = [
                    ...messageGroup[dateWithoutTime], message
                ]
            )
        })
             
        const messages = Object.entries(messageGroup).map((date, i) => {
            // Sort by time
            date[1].sort();
            const messagesOnThisDate = date[1].map((message, i)=> {
               
                return (
                    <React.Fragment key={i}>
                    <Link to={
                        {   
                            pathname: `/edit-message/${message.id}`,
                            state: {
                                content: `${message.content}`,
                                scheduled: message.scheduled,
                                id: message.id,
                        }
                    }}>
                        <li>   
                                <div className="message-preview-container">
                                   <p>{message.content}</p>
                                </div>
                            </li>
                    </Link>
                    </React.Fragment>
                
            )})
              // Put below in a separate component!
            return (
                <React.Fragment key={i}>
                    <p className="day-label">{this.convertToString(date[0])}:</p>
                    <ul>
                        {messagesOnThisDate}
                    </ul>
                </React.Fragment>
            )   

        })
        // Probably need pagination
        return (
            <div className="scheduled">
                <h1 className="label">Scheduled messages</h1>
                    <div className="scheduled-content-container">
                        {messages}
                    </div>
            </div>
        )
    }
}

MessageList.defaultProps = {
    messages: [
    ]
}