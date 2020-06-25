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


export default class Dashboard extends Component {

    static contextType = MessagesContext;

    render(){

        const newMessage = (this.props.demo) ? "demo/create-message" 
        : "dashboard/create-message"
      
        return (
            <>
                <div className="dashboard-container">
                <MessageList activeUser ={this.props.active} 
                demo={(this.props.demo)? true : false}/> 
                </div>
                <div className="scheduler-console">
                    <div className="console-btn-wrapper">
                        <Link to ={newMessage}>
                            <button type="button">
                                New Message
                            </button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}