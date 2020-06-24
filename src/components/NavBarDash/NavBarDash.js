import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'

import "./NavBarDash.css"
import LoginContext from '../../LoginContext';

const handleLogoutClick = () => {
    TokenService.clearAuthToken()
}

export default function DashNavBar(props) {

    return (
       <nav className="dashboard-nav">
           <div className="nav-container">
                <Link to="/">
                    <h1 className="nav-logo--dashboard">Start a <span role="img" aria-label="Fire">🔥</span></h1>
                </Link>
                <div className="nav-wrapper--dashboard">
                    <LoginContext.Consumer>
                        {user => (
                            <div className="profile-img-wrapper">
                                <img className="profile-img" 
                                    src={(props.user.profile_img_link)? props.user.profile_img_link 
                                    : "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204"} 
                                    alt="Profile"
                                    onClick={() => (user.toggleEditView()) ? "" : props.toggleEditView}
                                />
                            </div>
                        )}
                    </LoginContext.Consumer>
                    <p className="userName">{(props.user.full_name)}</p>
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
