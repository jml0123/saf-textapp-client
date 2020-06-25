import React, {Component} from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import MessagesContext from "../../MessagesContext"
import monthNames from "../../utils/Months"
import dayNames from "../../utils/Days"

import "./MessageList.css"
import LoginContext from '../../LoginContext';

export default class MessageList extends Component {
    
    static contextType = MessagesContext;

    // Add Date functions to one file

    isToday = (date) => {
        let d = moment(date);
        d = moment(d, "YYYY-MM-DDTHH:mm:ssZ")
        const today = moment().format()
        //(moment(d).format("DD"))
        //console.log(moment(today).format("DD"))


        return moment(d).format("DD") === moment(today).format("DD") &&
            moment(d).format("MM") === moment(today).format("MM") &&
            moment(d).format("YYYY") === moment(today).format("YYYY");
    };
    isTomorrow = (date) => {
        let d = moment(date);
        d = moment(d, "YYYY-MM-DDTHH:mm:ssZ")
        const tomorrow = moment().format()
        return moment(d).format("DD") === moment(tomorrow).format("DD") + 1 &&
               moment(d).format("MM") === moment(tomorrow).format("MM") &&
               moment(d).format("YYYY") === moment(tomorrow).format("YYYY");
    };

    getTime = (date) =>{
        let d = moment(date);
        d =  moment.utc(d).local().format("YYYY-MM-DDTHH:mm:ssZ")
        //console.log(d.format())
        //return `${d.format()}`;
        return moment(d).format('LT');
    }

    convertToString = (date) => {
        let d = moment(date);
        d = moment.utc(d).local().format("YYYY-MM-DDTHH:mm:ssZ")
        //console.log(d)
        
        if (this.isToday(d)) {
            return "Today"
        }

        if (this.isTomorrow(d)) {
            return "Tomorrow"
        }

        //console.log(d.format())
        //return `${d.format()}`;

        return `${moment(d).format('dddd')}, ${moment(d).format('MMMM DD')}`;
    }
    
    render(){
        let dates = []
        let messageGroup = {}
        const getDates = () => {
            (this.context.messages).forEach(message =>{
                const localizedDate = moment.utc(message.scheduled).local().format()
                const dateWithoutTime= localizedDate.split("T")[0]
                if(!dates.includes(dateWithoutTime)) {
                    dates = [...dates, dateWithoutTime]
                }})
                dates.sort();
        }
        getDates();

        messageGroup = dates.reduce((date1, date2) => (date1[date2] = [], date1), {});
        
        (this.context.messages).forEach(message =>{
            const localizedDate = moment.utc(message.scheduled).local().format()
            const dateWithoutTime= localizedDate.split("T")[0]
            return (
                messageGroup[dateWithoutTime] = [
                    ...messageGroup[dateWithoutTime], message
                ]
            )
        })
             
        const messages = Object.entries(messageGroup).map((date, i) => {
            // Sort by time
            date[1].sort(function(a, b) {
                let date1 = new Date(a.scheduled);
                let date2 = new Date(b.scheduled)
                return date1.getTime() - date2.getTime();
            });

            const pendingMessages = date[1].map((message, i)=> {
                // Indicate not queued if time has passed
                const editMessagePath = (this.props.demo)? 
                `demo/edit-message/${message.id}`
                : `dashboard/edit-message/${message.id}`;
                const notQueued =(moment(message.scheduled).utc() > moment().utc()) 
                ? "message-preview-container"
                : "message-preview-container sent"
                return (
                    <React.Fragment key={i}>
                    <Link to={
                        {   
                            pathname: editMessagePath,
                            state: {
                                content: message.content,
                                scheduled: message.scheduled,
                                messageId: message.id,
                                activeUser: this.props.activeUser,
                                demo: this.props.demo
                        }
                    }}>
                            <li> 
                                <p className="time-label">{this.getTime(message.scheduled)}</p>
                                <div className={notQueued}>
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
                        {pendingMessages}      
                    </ul>
                </React.Fragment>
            )   

        })
        // Probably need pagination
        return (
            <div className="scheduled">
                <h1 className="label">Scheduled messages</h1>
                    <div className="scheduled-content-container">
                        {(messages.length) ? messages: "No messages scheduled"}
                    </div>
            </div>
        )
    }
}

MessageList.defaultProps = {
    messages: [
    ]
}