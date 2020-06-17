import React from 'react';
import { Link } from 'react-router-dom';

import "./NavBar.css"

export default function NavBar(props) {
    return (
       <nav>
           <div className="nav-container">
                <Link to="/">
                    <h1 className="nav-logo">Start-a-fire 🔥</h1>
                </Link>
                <div className="nav-wrapper">
                <ul>
                    <li><Link to="/signup">Curators</Link></li>
                    <li><Link to="/login">Sign In</Link></li>
                </ul>
                </div>
            </div>
       </nav>
    )
}

