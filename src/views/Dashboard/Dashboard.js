import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import DashNavBar from "../../components/NavBarDash/NavBarDash";
import MessageList from "../../components/MessageList/MessageList";

import "./Dashboard.css"

// Should dashboard be its own router?

export default class SignUp extends Component {
    render(){
        return (
            <>
                <header>
                    <DashNavBar/>
                </header>
                <main className="LandingPage">
                    <div class="dashboard">
                        <MessageList/>
                    </div>
                    <div class="scheduler-console">
                        <div class="console-btn-wrapper">
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