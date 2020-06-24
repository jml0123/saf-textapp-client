
import React, {Component} from 'react';
import config from '../../config';
import "./UnsubscribeForm.css"

export default class UnsubscribeForm extends Component {
    state = {
        error: null
    }

    validatePhoneNumber(number){
        const US_PHONE_PATTERN = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return US_PHONE_PATTERN.test(number);
    }

    handleDeleteSubscriber = e => {
        e.preventDefault()
        
        if (this.validatePhoneNumber(this.phone_number.value) == false) {
            this.setState({result: `Must enter a valid US phone number`})
            return
        }

        const numberRaw = this.phone_number.value.replace(/[- )(]/g,'')
        
        const subscriber = {
            phone_number: numberRaw
        }

        this.setState({error: null})
        fetch(`${config.API_ENDPOINT}/subscribers/unsubscribe`, {
            method: 'POST',
            body: JSON.stringify(subscriber),
            headers: {
                'content-type': 'application/json'
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
            const deleteResult = (data.deleteCount === 1) ? `Successfully unsubscribed from ${data.deleteCount} curator`
            : (data.deleteCount === 0) ? `No curators to unsubscribe to!`
            : `Successfully unsubscribed from ${data.deleteCount} curators`
       
            this.setState({result: deleteResult})
        })
        .catch(error =>
            this.setState({error}))
    };
  

    render() {
    const headerMessage = (this.state.result)? this.state.result : "Unsubscribe from all curators"
    return (
        <div className="unsubscribe-container">
            <p>{headerMessage}</p>
            <form name="unsubscribe-form" onSubmit={this.handleDeleteSubscriber}>
                <div className="phone-num-input">
                    <input type="text" value="+1" className="country-code" readOnly/>
                    <input type="text" placeholder="XXX-XXX-XXXX" ref={input => this.phone_number = input} name="phone_number"/>
                </div>
                <button type="submit" className="action-critical">Unsubscribe</button>
            </form>
        </div>
    )
    }

}