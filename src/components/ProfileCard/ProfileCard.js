import React, {Component} from 'react';
import "./ProfileCard.css"

export default class ProfileCard extends Component {
    render(){
        return (
            <div className="curator-container">
            <img src={this.props.profileImg} className="profile-img" alt="Profile"/>
            <div className="curator-cta">
                <div className="curator-profile">
                    <h1>{this.props.name}</h1>
                    <p>{this.props.description}</p>
                </div>
                <div className="subscribe-container">
                    <form>
                        <input type="text" placeholder="XXX-XXX-XXXX"/>
                        <button>Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

ProfileCard.defaultProps = {
    name: "John Doe",
    profileImg: "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
}
