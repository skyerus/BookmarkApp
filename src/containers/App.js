import React, { Component } from 'react';

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {togglePopupSignup, togglePopupLogin} from '../actions/loginSignupModalActions';
import {login, signUp, toggleJustSignedUp, loginHasExpired,signUpHasErroredFunc, loginHasErroredFunc, addUserID} from '../actions/loginSignUpActions';
import {createCategory} from '../actions/bookmarksActions';

import Signup from '../components/Signup';
import Login from '../components/Login';
import ModalLS from '../components/ModalLS';
import Navbar from '../containers/Navbar';
import WelcomePage from '../components/WelcomePage';

class App extends Component {

  componentDidMount() {
    if (this.props.isLoggedIn && document.cookie.length === 0) {
      this.props.loginHasExpired()
      this.props.addUserID(0)
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
        createCategory={this.props.createCategory}
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
        signUpIsLoading= {this.props.signUpIsLoading} 
        hasErrored={this.props.signUpHasErrored} 
        signUp={this.props.signUp} 
        signuppopup={this.props.signupPopup}  
        togglePopupSignup={this.props.togglePopupSignup}
        userAlreadyExists = {this.props.userAlreadyExists}
        signUpHasErroredFunc = {this.props.signUpHasErroredFunc}
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
        userNoExists={this.props.userNoExists}
        incorrectPassword= {this.props.incorrectPassword}
        loginHasErroredFunc={this.props.loginHasErroredFunc}
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
  loginHasExpired: PropTypes.func.isRequired,
  userAlreadyExists: PropTypes.bool,
  signUpHasErroredFunc: PropTypes.func.isRequired,
  loginHasErroredFunc: PropTypes.func.isRequired,
  userNoExists: PropTypes.bool,
  incorrectPassword: PropTypes.bool,
  addUserID: PropTypes.func.isRequired
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
  justSignedUp: state.SignUp.justSignedUp,
  userAlreadyExists: state.SignUp.userAlreadyExists,
  userNoExists: state.Login.userNoExists,
  incorrectPassword: state.Login.incorrectPassword
})

export default connect(mapStateToProps, {togglePopupSignup, togglePopupLogin, login, signUp, toggleJustSignedUp, loginHasExpired,createCategory, signUpHasErroredFunc, loginHasErroredFunc, addUserID})(App);

