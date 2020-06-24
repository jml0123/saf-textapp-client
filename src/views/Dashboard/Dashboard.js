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
    static contextType = MessagesContext;

    render(){
        const renderMessageList = (this.props.messageList !== [])?  <MessageList activeUser ={this.props.active}/> : null
        return (
            <>
                <div className="dashboard-container">
                    {renderMessageList}
                </div>
                <div className="scheduler-console">
                    <div className="console-btn-wrapper">
                        <Link to ="dashboard/create-message">,
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