import React, {Component} from 'react';
import ProfileCard from "../ProfileCard/ProfileCard";
import "./CuratorList.css"

export default class CuratorList extends Component {
    render(){
        const curators = (this.props.curators).map(curator => {
            return (
                <ProfileCard 
                    name={curator.name}
                    description ={curator.description}
                />
            )
        })  
        return (
            <div className="curator-wrapper">
                {curators}
            </div>
        )
    }
}

CuratorList.defaultProps = {
    curators: [
        {
            name: "John Doe",
            profileImg: "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        },
        {
            name: "Jane Doe",
            profileImg: "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        },
        {
            name: "Rodney Wyatt",
            profileImg: "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        },
    ]
}
