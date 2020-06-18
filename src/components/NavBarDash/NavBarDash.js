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
                    <img className="profile-img" src={props.profileImg} alt="Profile"/>
                    <ul>
                        <li><Link to="/login">Sign Out</Link></li>
                    </ul>
                </div>
            </div>
       </nav>
    )
}

// Context should be user image


DashNavBar.defaultProps = {
    profileImg: "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204"
}
