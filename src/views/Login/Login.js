import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";


import "./Login.css"

export default class Login extends Component {

    // refactor login form to component 
    state = {error: null}

  

    // Need to create login failed situation

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({error: null})
        const { username, password } = e.target
    
        AuthApiService.postLogin({
                username: username.value,
                password: password.value,
            }         
            ).then(res => {
                username.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                console.log(res)
                this.handleLoginSuccess("dashboard")
            }).catch(res => {
                this.setState({ error: res.error })
          })
          
    }
      
    

    handleLoginSuccess = path => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || `/${path}`
        history.push(destination)
    }
    

    render(){
        return (
            <>
                <header>
                    <NavBar/>
                    <Banner heading="Leaders 🔥" subheading="Keep Up The Momentum"/>
                </header>
                <main className="LandingPage">
                <div className="login-container">
                    <form id="login" onSubmit={this.handleSubmit}>
                        <h1>Sign-in</h1>
                        <div className="error-msg"><p>{this.state.error}</p></div>
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