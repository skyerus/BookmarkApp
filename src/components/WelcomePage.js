import React, {Component} from 'react'

import {NavLink} from 'react-router-dom';

import Modal from './Modal';
export default class WelcomePage extends Component {
    componentDidMount() {
        if (this.props.loginPopup) {
            this.props.togglePopupLogin(false)
        } else if (this.props.signupPopup) {
            this.props.togglePopupSignup(false)
        } 
        if (this.props.justSignedUp) {
            this.props.createCategory("master",0,[],[],[],[],0)
        }
    }

    handleSubmit(e) {
        this.props.toggleJustSignedUp(false)
    }
    
    render() {
        let modal;
        if (this.props.justSignedUp) {
            modal = <Modal title="Your account has been created, welcome " mystyle="signed-in-modal">
                <h1 className="username-border">{this.props.username}</h1>
                <p className="modal-p">Start creating bookmarks</p>
                <div className="signup-buttons">
                    <NavLink to="/bookmarks">
                        <button className="btn btn-dark btn-lg login-btn" onClick={() => this.handleSubmit()}>
                            Here
                        </button>
                    </NavLink>
                </div>
            </Modal>
        } else {
            modal = <Modal title="Welcome back " mystyle="signed-in-modal">
                <h1 className="username-border">{this.props.username}</h1>
                <p className="modal-p">Access your bookmarks</p>
                <div>
                    <NavLink to="/bookmarks">
                        <button className="btn btn-dark btn-lg login-btn">
                            Here
                        </button>
                    </NavLink>
                </div>
            </Modal>
        }
        return (
        <div>
            {modal}
        </div>
        )
    }
}
    
