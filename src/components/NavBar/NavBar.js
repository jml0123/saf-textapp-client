import React from 'react';
import { Link } from 'react-router-dom';

import "./NavBar.css"

export default function NavBar(props) {
    return (
       <nav>
           <div className="nav-container">
                <Link to="/">
                    <h1 className="nav-logo">Start a <span role="img" aria-label="Fire">🔥</span></h1>
                </Link>
                <div className="nav-wrapper">
                <ul>
                    <li><Link to="/login">Activate Your Base</Link></li>
                    <li><Link to="/demo">Try a Demo</Link></li>
                </ul>
                </div>
            </div>
       </nav>
    )
}



