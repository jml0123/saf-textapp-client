import React, {Component} from 'react';
import ProfileCard from "../ProfileCard/ProfileCard";
import UsersContext from "../../UsersContext"
import "./CuratorList.css"

export default class CuratorList extends Component {
    
    static contextType = UsersContext;
  
    render(){
        console.log(this.context)
        const curators = (this.context.users).map((curator,i) => {
            return (
                <ProfileCard 
                    key={i}
                    name={curator.full_name}
                    description ={curator.profile_description}
                    profileImg = {curator.profile_img_link}
                    curator_id = {curator.id}
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
