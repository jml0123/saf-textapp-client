import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageList from "../../components/MessageList/MessageList";
import MessagesContext from "../../MessagesContext"

import "./Dashboard.css"

// Should dashboard be its own router?

export default class SignUp extends Component {
    static contextType = MessagesContext;
    render(){
        return (
            <>
                <header>
                    <DashNavBar/>
                </header>
                <main className="Dashboard">
                    <div className="dashboard-container">
                        <MessageList/>
                    </div>
                    <div className="scheduler-console">
                        <div className="console-btn-wrapper">
                            <Link to ="/create-message">
                                <button type="button">
                                    New Message
                                </button>
                            </Link>
                            <button disabled={true}>
                                Stats
                            </button>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}