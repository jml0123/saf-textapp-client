import React from 'react';
import { Link } from 'react-router-dom';

import "./NavBarDash.css"

export default function DashNavBar(props) {
    return (
       <nav className="dashboard-nav">
           <div className="nav-container">
                <Link to="/">
                    <h1 className="nav-logo--dashboard">Start-a-fire  <span role="img" aria-label="Fire">🔥</span></h1>
                </Link>
                <div className="nav-wrapper--dashboard">
                    <img className="profile-img" src={props.user.active.user.profileImg} alt="Profile"/>
                    <p className="userName">{props.user.active.user.name}</p>
                    <ul>
                        <li><Link to="/login">Sign Out</Link></li>
                    </ul>
                </div>
            </div>
       </nav>
    )
}

// Context should be user image


