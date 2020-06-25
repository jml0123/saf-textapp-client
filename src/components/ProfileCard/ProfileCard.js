import React, {Component} from 'react';
import config from '../../config';
import "./ProfileCard.css"

export default class ProfileCard extends Component {

    state = {
        error: null,
        subscriberCount: null,
        displayedSubs: null,
    }

    validatePhoneNumber(number){
        const US_PHONE_PATTERN = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return US_PHONE_PATTERN.test(number);
    }
    async componentDidMount() {
        await this.getNumberOfSubs(this.props.curator_id)
        await this.setRandomSubs()
    }

    setRandomSubs = async () =>{
        const subscriberCountRand = 
        
        (!this.state.subscriberCount || parseInt(this.state.subscriberCount) === 0) ? 
        20 + Math.floor(Math.random() * 100) 
        
        : this.state.subscriberCount;

        this.setState({
            ...this.state,
            displayedSubs: subscriberCountRand
        })
    }

    getNumberOfSubs = async curator_id => {
        fetch(`${config.API_ENDPOINT}/subscribers/curator/${curator_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                //No Auth required
            }
            })
            .then(res => {
                if (!res.ok) {
                throw new Error(res.status)
                }
                return res.json()
            })
            .then(count => {
                const countToInt = count[0].count
                this.setNumberOfSubs(countToInt)
            })
            .catch(error => this.setState({ error }))
    }

    setNumberOfSubs = count => {
        this.setState({
            ...this.state.error,
            subscriberCount: count
        })
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
            this.setState({
                ...this.state,
                result: `Successfully Subscribed to ${this.props.name}`,
                subscriberCount: parseInt(this.state.subscriberCount) + 1
            })
            if (this.props.callback){
                console.log(`running ${this.props.callback} callback`)
                this.props.callback(data)
            }
        })
        .catch(error =>
            this.setState({error}))
    };
    
    render(){
        
        const subscribers = (parseInt(this.state.subscriberCount) !== 0 || this.props.demo) ? this.state.subscriberCount : this.state.displayedSubs

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
                    <div className="curator-profile-heading">
                        <h1>{this.props.name}</h1>
                        <h1 className="subs-count">
                            {subscribers} 
                            <span role="img" aria-label="Fire">🔥</span></h1>
                    </div>
                    <p>{this.props.description}</p>
                </div>
                <div className="phone-num-container">
                    <form onSubmit = {this.handleAddSubscriber}>
                        <div className="phone-num-input">
                            <input type="text" value="+1" className="country-code" readOnly/>
                            <input type="text" placeholder="XXX-XXX-XXXX" ref={input => this.phone_number = input} name="phone_number"/>
                        </div>
                        <button className="phone-commit-btn" type="submit">{(this.state.result) ? "Subscribed!" : "Subscribe"}</button>
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
