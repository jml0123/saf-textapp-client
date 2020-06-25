import React from 'react';
import "./Banner.css"

// Randomize on reload
const bannerImgs = [
    "https://images.unsplash.com/photo-1576568699714-a3f4950805d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2702&q=80",
    "https://images.unsplash.com/photo-1547937111-226d447ec1c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1590932149015-418f21d62a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
    "https://images.unsplash.com/photo-1591281865948-ff4178788278?ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80",
    "https://images.unsplash.com/photo-1552799446-159ba9523315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
]

export default function Banner(props) {
    return (
        <div className="banner-container">
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