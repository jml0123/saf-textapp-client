import React, {Component} from 'react';
import config from '../../config';
import "./ProfileCard.css"

export default class ProfileCard extends Component {

    state = {
        error: null
    }
    validatePhoneNumber(number){
        const US_PHONE_PATTERN = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return US_PHONE_PATTERN.test(number);
    }

    handleAddSubscriber = e => {
        e.preventDefault()
        
        if (this.validatePhoneNumber(this.phone_number.value) == false) {
            this.setState({result: `Must enter a valid US phone number`})
            return
        }

        const subscriber = {
            phone_number: this.phone_number.value,
            curator_id:  this.props.curator_id
        }

        
        this.setState({error: null})
        fetch(`${config.API_ENDPOINT}/subscribers`, {
            method: 'POST',
            body: JSON.stringify(subscriber),
            headers: {
                'content-type': 'application/json'
                // no authorization required
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            this.setState({result: `Successfully Subscribed to ${this.props.name}`})
        })
        .catch(error =>
            this.setState({error}))
    };
  

    // On subscribe, add number to curator-id
    //POST REQUEST

    render(){

        const userImg = (this.props.profileImg === null)? 
            "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204"
            : this.props.profileImg
        return (
            <div className="curator-container">
            <div className="profile-img-wrapper--card">
                <img src={userImg} className="profile-img" alt="Profile"/>
            </div>
            <div className="curator-cta">
                <div className="curator-profile">
                    <h1>{this.props.name}</h1>
                    <p>{this.props.description}</p>
                </div>
                <div className="subscribe-container">
                    <form onSubmit = {this.handleAddSubscriber}>
                        <div className="phone-num-input">
                            <input type="text" value="+1" className="country-code" readOnly/>
                            <input type="text" placeholder="XXX-XXX-XXXX" ref={input => this.phone_number = input} name="phone_number"/>
                        </div>
                        <button type="submit">Subscribe</button>
                    </form>
                    <div className="result-container">{this.state.result}</div>
                </div>
            </div>
        </div>
        )
    }
}

ProfileCard.defaultProps = {
    "profileImg": "https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204"
}
