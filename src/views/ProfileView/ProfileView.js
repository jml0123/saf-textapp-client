import React, {Component} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import Banner from "../../components/Banner/Banner";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import config from '../../config';

import "./ProfileView.css"

export default class ProfileView extends Component{

    _isMounted = false;
    state = {
        user: []
    }
    componentDidMount() {
        this._isMounted = true;


        if(this._isMounted) {
            fetch(`${config.API_ENDPOINT}/profiles/${this.props.match.params.id}`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
              }
            })
              .then(res => {
                if (!res.ok) {
                  throw new Error(res.status)
                }
                return res.json()
              })
              .then(this.setUser)
              .catch(error => this.setState({ error }))
          }
        }
    
      setUser = user => {
        this.setState({
          user,
          error: null
        })
      }
    // Get user data

    
    render(){
        const userInfo = this.state.user

        return (
            <>
                <header>
                    <NavBar/>
                    <Banner/>
                </header>
                <main>
                    <h1 className="section-heading">
                            Custom text messages and news from thought leaders, curators and revolutionaries
                    </h1>
                    <div className="curator-wrapper">
                        <ProfileCard name={userInfo.full_name} description ={userInfo.profile_description} profileImg = {userInfo.profile_img_link} />
                    </div>
                </main>
            </>
        )
    }
}
