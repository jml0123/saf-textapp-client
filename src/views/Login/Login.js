import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'

import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";

import "./Login.css"

export default class Login extends Component {

    // refactor login form to component 

    handleLoginSuccess = path => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || `/${path}`
        history.push(destination)
    }

    // Need to create login failed situation

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = e.target

        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(username.value, password.value)
        )
        
        username.value = ''
        password.value = ''
        this.handleLoginSuccess("dashboard")
    }
    

    render(){
        return (
            <>
                <header>
                    <NavBar/>
                    <Banner heading="Curator Sign-in" subheading="Keep Up The Momentum"/>
                </header>
                <main className="LandingPage">
                <div className="login-container">
                    <form id="login" onSubmit={this.handleSubmit}>
                        <h1>Sign-in</h1>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password"/>
                        <div className="btn-row">
                         <button type="button" type="submit">Login</button>
                        </div>  
                        <p className="sign-up-prompt">Don't have an account? <Link to ="/signup"><span className="signup">Sign up</span></Link></p>
                    </form>
                </div>
                </main>
            </>
        )
    }
}