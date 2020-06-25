import React from 'react';
import "./Banner.css"

export default function Banner(props) {
    const bannerClass = (props.small)? "banner-container sm" : "banner-container"
    return (
        <div className={bannerClass}>
            <div className="banner-content">
                <h1>{props.heading}</h1>
                <h2 className="tagline">{props.subheading}</h2>
            </div>
        </div>
    )
}

Banner.defaultProps = {
    heading: "Start a 🔥",
    subheading: "Send a message. Make the cause personal."
}