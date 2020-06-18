import React, {Component} from 'react';
import {useParams} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import MessageForm from "../../components/MessageForm/MessageForm";

import UsersContext from "../../UsersContext";

import "./ProfileView.css"

export default class ProfileView extends Component{
    static contextType = UsersContext;
    
    render(){
        const userInfo = this.context.users.filter(user => user.id == this.props.match.params.id)[0];
        return (
            <>
                <header>
                    <NavBar/>
                </header>
                <main>
                    <div class="curator-wrapper">
                        <h1 className="section-heading">
                            Custom text messages and news from thought leaders, curators and revolutionaries
                        </h1>
                        <ProfileCard name={userInfo.name} description ={userInfo.description} profileImg = {userInfo.profileImg} />
                    </div>
                </main>
            </>
        )
    }
}
