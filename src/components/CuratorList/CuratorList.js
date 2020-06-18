import React, {Component} from 'react';
import ProfileCard from "../ProfileCard/ProfileCard";
import UsersContext from "../../UsersContext"
import "./CuratorList.css"

export default class CuratorList extends Component {
    static contextType = UsersContext;


    render(){
        const curators = (this.context.users).map((curator,i) => {
            return (
                <ProfileCard 
                    key={i}
                    name={curator.name}
                    description ={curator.description}
                    profileImg = {curator.profileImg}
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
    ]
}
