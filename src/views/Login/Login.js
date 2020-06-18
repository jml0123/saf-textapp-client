import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";

import "./Login.css"

export default class Login extends Component {
    render(){
        return (
            <>
                <header>
                    <NavBar/>
                    <Banner heading="Curator Sign-in" subheading="Keep Up The Momentum"/>
                </header>
                <main className="LandingPage">
                <div className="login-container">
                    <form id="login">
                        <h1>Sign-in</h1>
                        <label htmlFor="e-mail">E-mail</label>
                        <input type="text" id="e-mail"/>
                        <label htmlFor="e-mail">Password</label>
                        <input type="password" id="password"/>
                        <div className="btn-row">
                            <Link to ="/dashboard">
                                <button type="button">Login</button>
                            </Link>
                        </div>  
                        <p className="sign-up-prompt">Don't have an account? <Link to ="/signup"><span className="signup">Sign up</span></Link></p>
                    </form>
                </div>
                </main>
            </>
        )
    }
}