import React, {Component} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

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
                    <div className="curator-wrapper">
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
