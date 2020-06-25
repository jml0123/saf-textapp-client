import React from 'react';

import UnsubscribeForm from "../../components/UnsubscribeForm/UnsubscribeForm";

import "./Footer.css"

export default function Footer(props) {
    return (
        <footer>
            <div className="border-gradient">
                <a href="https://github.com/jml0123" target="_blank">
                    <div className="content-row">
                        <p>made with caffeine</p>
                        <img src="https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png" alt="github logo" className = "icon" />
                    </div>
                </a>
            </div>
            <div className="footer-container">
                <UnsubscribeForm/>
            </div>
        </footer>
    )
}
