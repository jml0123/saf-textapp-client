import React, {Component} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import MessageForm from "../../components/MessageForm/MessageForm";
import UsersContext from "../../UsersContext";

import "./ProfileView.css"

export default class ProfileView extends Component{
    static contextType = UsersContext;

    render(){
        return (
            <>
                <header>
                    <NavBar/>
                </header>
                <main className="LandingPage">
                    <h1 className="section-heading">
                        Custom text messages and news from thought leaders, curators and revolutionaries
                    </h1>
                    <ProfileCard/>
                </main>
            </>
        )
    }
}
