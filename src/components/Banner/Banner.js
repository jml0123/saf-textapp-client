import React from 'react';
import "./Banner.css"

export default function Banner(props) {
    return (
        <div className="banner-container">
            <div className="banner-content">
                <h1 classNAme="logo">🔥</h1>
                <h1>{props.heading}</h1>
                <h2 className="tagline">{props.subheading}</h2>
            </div>
        </div>
    )
}

Banner.defaultProps = {
    heading: "Start-a-fire",
    subheading: "Lorem ipsum dolor"
}