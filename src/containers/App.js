import React, { Component } from 'react';

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {togglePopupSignup, togglePopupLogin} from '../actions/loginSignupModalActions';
import {login, signUp, toggleJustSignedUp, loginHasExpired} from '../actions/loginSignUpActions';

import Signup from '../components/Signup';
import Login from '../components/Login';
import ModalLS from '../components/ModalLS';
import Navbar from '../containers/Navbar';
import WelcomePage from '../components/WelcomePage';

class App extends Component {

  componentDidMount() {
    if (this.props.isLoggedIn && document.cookie.length === 0) {
      this.props.loginHasExpired()
    }
  }
  
  render() {
    if (this.props.redirect) {
      return <Redirect to = '/home' />
    }
    let welcome;

    // Decides which modal to present based on current state
    if (this.props.justSignedUp || this.props.isLoggedIn){
      welcome =
      <WelcomePage 
        isLoggedIn={this.props.isLoggedIn} 
        toggleJustSignedUp={this.props.toggleJustSignedUp}
        justSignedUp={this.props.justSignedUp}
        togglePopupLogin = {this.props.togglePopupLogin}
        togglePopupSignup= {this.props.togglePopupSignup}
        loginPopup={this.props.loginPopup}
        signupPopup={this.props.signupPopup}
        username={this.props.username}
      />
    } else if (!this.props.signupPopup && !this.props.loginPopup){
      welcome = 
      <ModalLS 
        togglePopupSignup={this.props.togglePopupSignup}
        togglePopupLogin={this.props.togglePopupLogin}
      />
    } else if (this.props.signupPopup) {
      welcome = 
      <Signup 
        isLoading= {this.props.signUpIsLoading} 
        hasErrored={this.props.signUpHasErrored} 
        signUp={this.props.signUp} 
        signuppopup={this.props.signupPopup}  
        togglePopupSignup={this.props.togglePopupSignup}
      />
    } else {
      welcome =
      <Login 
        isLoading= {this.props.loginIsLoading} 
        hasErrored={this.props.loginHasErrored}  
        login={this.props.login} 
        loginpopup={this.props.loginPopup} 
        togglePopupLogin={this.props.togglePopupLogin}
        loginIsLoading={this.props.loginIsLoading}
      />

    }
    return (
      <div className="App background-img">
          <Navbar/>
        <div className={(this.props.signupPopup || this.props.loginPopup) ? "modal-bg not-hidden" : null}>
          {welcome}
        </div>
      </div>
      )
  }
}

App.propTypes = {
  signuppopup: PropTypes.bool,
  loginpopup: PropTypes.bool,
  togglePopupSignup: PropTypes.func.isRequired,
  togglePopupLogin: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  username: PropTypes.string,
  redirectLogin: PropTypes.bool,
  loginIsLoading: PropTypes.bool,
  signUpHasErrored: PropTypes.bool,
  signUpIsLoading: PropTypes.bool,
  toggleJustSignedUp: PropTypes.func.isRequired,
  justSignedUp: PropTypes.bool,
  justLoggedIn: PropTypes.bool,
  loginHasExpired: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  signupPopup: state.LoginSignupModal.signuppopup,
  loginPopup: state.LoginSignupModal.loginpopup,
  username: state.Login.username,
  isLoggedIn: state.Login.isLoggedIn,
  loginHasErrored: state.Login.loginHasErrored,
  redirectLogin: state.Login.redirectLogin,
  loginIsLoading: state.Login.loginIsLoading,
  signUpHasErrored: state.SignUp.signUpHasErrored,
  signUpIsLoading: state.SignUp.signUpIsLoading,
  justSignedUp: state.SignUp.justSignedUp
})

export default connect(mapStateToProps, {togglePopupSignup, togglePopupLogin, login, signUp, toggleJustSignedUp, loginHasExpired})(App);

