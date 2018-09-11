import React, {Component} from 'react'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';

import {togglePopupLogin,togglePopupSignup} from '../actions/loginSignupModalActions';
import {logout} from '../actions/loginSignUpActions';

class Navbar extends Component  {

    render() {
        return (
        <div className="nav-container">
            <div className="my-container">
                <ul className="row-nav">
                    <NavLink exact to="/" activeClassName="active-link" className="row-nav-item">
                        Home
                    </NavLink>
                    <NavLink to="/bookmarks" activeClassName="active-link" className="row-nav-item bookmarks-nav-item">
                        Bookmarks
                    </NavLink>
                    {this.props.isLoggedIn ? 
                        null 
                        : !this.props.signupPopup ? 
                            <NavLink exact to="/" className="signup-nav-item row-nav-item">
                                <div onClick={()=>this.props.togglePopupSignup(true)}>
                                    Signup
                                </div>
                            </NavLink>
                            : null 
                    }
                    {this.props.isLoggedIn ?
                        <NavLink exact to="/" className="login-nav-item row-nav-item">
                            <div onClick={this.props.logout}>
                                Logout
                            </div>
                        </NavLink> 
                        :!this.props.loginPopup ?
                            <NavLink exact to="/" className="login-nav-item row-nav-item">
                                <div onClick={()=>this.props.togglePopupLogin(true)}>
                                    Login
                                </div>
                            </NavLink>
                            :null 
                    }
                </ul>
            </div>
    </div>
    )}
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    togglePopupLogin:PropTypes.func.isRequired,
    togglePopupSignup: PropTypes.func.isRequired,
    signupPopup: PropTypes.bool,
    loginPopup: PropTypes.bool  
  }

const mapStateToProps = state => ({
    isLoggedIn: state.Login.isLoggedIn,
    signupPopup: state.LoginSignupModal.signuppopup,
    loginPopup: state.LoginSignupModal.loginpopup
})

export default connect(mapStateToProps,{togglePopupLogin,togglePopupSignup,logout})(Navbar)
