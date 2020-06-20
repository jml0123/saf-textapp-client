import React from 'react';
import { Link } from 'react-router-dom';

import "./NavBar.css"

export default function NavBar(props) {
    return (
       <nav>
           <div className="nav-container">
                <Link to="/">
                    <h1 className="nav-logo">Start-a-fire <span role="img" aria-label="Fire">🔥</span></h1>
                </Link>
                <div className="nav-wrapper">
                <ul>
                    <li><Link to="/login">Curators</Link></li>
                </ul>
                </div>
            </div>
       </nav>
    )
}



