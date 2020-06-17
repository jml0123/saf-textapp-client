import React, {Component} from 'react';

import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";

import "./SignUp.css"

export default class SignUp extends Component {
    render(){
        return (
            <>
                <header>
                    <NavBar/>
                    <Banner/>
                </header>
                <main className="LandingPage">
                <div class="login-container">
                    <form id="login">
                        <h1>Sign-Up</h1>
                        <label for="e-mail">E-mail</label>
                        <input type="text" id="e-mail"/>
                        <label for="e-mail">Password</label>
                        <input type="password" id="password"/>
                        <label for="description">Why do you want to be an activist?</label>
                        <textarea id="description" rows="4" cols="40" form="login"></textarea>
                        <button type="button">Submit</button>
                    </form>
                </div>
                </main>
            </>
        )
    }
}