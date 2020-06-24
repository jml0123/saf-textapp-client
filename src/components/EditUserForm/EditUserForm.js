import React, {Component} from 'react';
import config from '../../config';
import TokenService from '../../services/token-service'

import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

import "./EditUserForm.css"
import LoginContext from '../../LoginContext';

export default class EditUserForm extends Component {

    static contextType = LoginContext;


    constructor(props){
        super(props)
        this.state = {
            user: {
                id: this.props.user.id,
                username: this.props.user.username,
                full_name: this.props.user.full_name,
                profile_img_link: this.props.user.profile_img_link,
                profile_description: this.props.user.profile_description
            },
            error: null,
            copiedLink: false
        }
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (e) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            this.props.toggleEditView()
        }
    }

    disabledSubmit() {
        if(this.props.user === this.state.user) {
            return true
        }
        else return false
    }

    handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(`https://saf-textapp-client.jml0123.vercel.app/profiles/${this.state.user.id}`);
        this.setState({
            ...this.state,
            copiedLink: true
        })
    }

    updatedisplayName(e) {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user, 
                full_name: e.target.value
            }
        });
    }
    updateProfileImg(e) {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user, 
                profile_img_link: e.target.value
            }
        });
        console.log(this.state.user)
    }
    updateProfileDesc(e) {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user, 
                profile_description: e.target.value
            }
        });
        console.log(this.state.user)
    }

    handleEditUser = e => {
        e.preventDefault()
        const user_id = this.props.user.id;
        const username = this.state.user.username;
        const full_name = this.state.user.full_name;
        const profile_img_link = this.state.user.profile_img_link;
        const profile_description = this.state.user.profile_description;

        const updatedData = {
            id: user_id,
            username: username,
            full_name: full_name,
            profile_img_link: profile_img_link,
            profile_description: profile_description
        }

        this.setState({error: null})
        fetch(`${config.API_ENDPOINT}/profiles/${user_id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedData),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
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
        .then(user => {
            this.setState({error: null});
            // Make request here
            this.context.editUser(user);
        })
        .catch(err => {
            console.error(err)
        })
    }
    handleDeleteUser = e => {
        e.preventDefault()

        this.setState({ error: null })
        fetch(`${config.API_ENDPOINT}/profiles/${this.props.user.id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
          }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
        })
        .then(res => {
            this.context.deleteUser(this.props.user.id)
            this.props.onDeleteUser()
        })
        .catch(err => {
            console.error(err)
        })
    }

    render(){
        const copied = (this.state.copiedLink) ? "Profile copied to clipboard!" : ""

        return(

            <div className="edit-wrapper" ref={this.wrapperRef}>
                <div className="edit-container">
                <button type="button" onClick={this.props.toggleEditView} className="btn-cancel">X</button>
                <form id="edit-user" name="edit-user" onSubmit={this.handleEditUser}>
                    <h1>{this.props.user.full_name}</h1>
                    <div className="profile-img-container--edit">
                        <div className="profile-img-wrapper--edit">
                            <img src={this.state.user.profile_img_link}/>
                        </div>
                    </div>
                    <div className="error-msg"><p>{this.state.error}</p></div>
                    <label htmlFor="full_name">Display Name</label>
                    <input type="text" id="full_name" name="full_name" defaultValue={this.props.user.full_name} onChange={e=>this.updatedisplayName(e)}/>
                    <label htmlFor="profile_img_link">Link a profile image here (must be hosted online)</label>
                    <input type="text" id="profile_img_link" name="profile_img_link" defaultValue={this.props.user.profile_img_link} onChange={e => this.updateProfileImg(e)}/>`
                    <label htmlFor="profile_description">Activist Bio</label>
                    <textarea id="profile_description" rows="4" cols="40" form="edit-user" name="profile_description" defaultValue={this.props.user.profile_description} onChange={e => this.updateProfileDesc(e)}></textarea>
                    <button type="button" type="submit" disabled={this.disabledSubmit} >Submit</button>
                    <div className="share-profile-wrapper">
                        <div className="share-profile-img-container">
                            <img className="share-profile-img" src="https://image.flaticon.com/icons/png/512/25/25419.png" onClick={this.handleCopy}/>
                        </div>
                        <p>Share</p>
                    </div>
                    <p>{copied}</p>
                </form>
            </div>
            </div>
 
        )
    }
}

