import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import handleSuccess from '../../utils/Redirects'

import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";

import "./SignUp.css"

export default class SignUp extends Component {

    
    handleSubmit = e => {
        e.preventDefault()
        const { username, password, full_name, profile_img_link, profile_description} = e.target
        
        const profileImg = (profile_img_link)? profile_img_link.value : null;
        const profileDesc = (profile_description)? profile_description.value : null;
        this.setState({error:null})
        this.postUser({
            username: username.value,
            password: password.value,
            full_name: full_name.value,
            profile_img_link: profileImg,
            profile_description: profileDesc
        })
        .then(user => {
            username.value = ''
            password.value = ''
            full_name.value = ''
            profile_img_link.value = ''
            profile_description.value = ''
            console.log(user)
            this.handleRegistrationSuccess("login")
        })
        .catch(res => {
            this.setState({error: res.error})
        })
    }

    // Copy this to a service file (this exists in login too)
    handleRegistrationSuccess = path => {
        console.log("called")
        const { location, history } = this.props
        const destination = (location.state || {}).from || `/${path}`
        history.push(destination)
    }

    postUser(user) {
            return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => 
            (!res.ok) 
                ? res.json().then(e => Promise.reject(e))
                : res.json()    
        )
    }
    
    render(){
        return (
            <>
                <header>
                    <NavBar/>
                    <Banner/>
                </header>
                <main className="LandingPage">
                <div className="login-container">
                    <form id="register" onSubmit={this.handleSubmit}>
                        <h1>Sign-Up</h1>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username"/>
                        <label htmlFor="e-mail">Password</label>
                        <input type="password" id="password" name="password"/>
                        <label htmlFor="full_name">Full Name</label>
                        <input type="text" id="full_name" name="full_name"/>
                        <label htmlFor="profile_img_link">TEST BUILD: Link a profile image here (must be hosted online)</label>
                        <input type="text" id="profile_img_link" name="profile_img_link"/>
                        <label htmlFor="profile_description">Why do you want to be an activist?</label>
                        <textarea id="profile_description" rows="4" cols="40" form="register" name="profile_description"></textarea>
                        <button type="button" type="submit">Submit</button>
                    </form>
                </div>
                </main>
            </>
        )
    }
}