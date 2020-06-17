import React, {Component} from 'react';

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
                <div class="login-container">
                    <form id="login">
                        <h1>Sign-in</h1>
                        <label for="e-mail">E-mail</label>
                        <input type="text" id="e-mail"/>
                        <label for="e-mail">Password</label>
                        <input type="password" id="password"/>
                        <button type="button">Login</button>
                    </form>
                </div>
                </main>
            </>
        )
    }
}