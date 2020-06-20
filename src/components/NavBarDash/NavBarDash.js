import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'

import "./NavBarDash.css"

const handleLogoutClick = () => {
    TokenService.clearAuthToken()
}

export default function DashNavBar(props) {
    //console.log(props.user)
    return (
       <nav className="dashboard-nav">
           <div className="nav-container">
                <Link to="/">
                    <h1 className="nav-logo--dashboard">Start-a-fire  <span role="img" aria-label="Fire">🔥</span></h1>
                </Link>
                <div className="nav-wrapper--dashboard">
                    <div className="profile-img-wrapper">
                        <img className="profile-img" src={props.user.profile_img_link} alt="Profile"/>
                    </div>
                    <p className="userName">{props.user.full_name}</p>
                    <ul>
                        <li>
                            <Link 
                                onClick={handleLogoutClick}
                                to="/">Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
       </nav>
    )
}

// Context should be user image


