import React, { Component } from 'react';

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {togglePopupSignup, togglePopupLogin} from '../actions/loginSignupModalActions';
import {login, signUp} from '../actions/loginSignUpActions';

import Signup from '../components/Signup';
import Login from '../components/Login';
import JumbotronLS from '../components/ModalLS';
import Navbar from '../components/Navbar';


class App extends Component {
  render() {
    if (this.props.redirect) {
      return <Redirect to = '/home' />
    }
    if (!this.props.signuppopup && !this.props.loginpopup){
      return <div><Navbar/><div className="App background-img">
      <JumbotronLS 
        togglePopupSignup={this.props.togglePopupSignup}
        togglePopupLogin={this.props.togglePopupLogin}
      /></div></div>
    } else if (this.props.signuppopup) {
      return <div><Navbar/><div className="App background-img">
      <Signup 
        isLoading= {this.props.signUpIsLoading} 
        hasErrored={this.props.signUpHasErrored} 
        signUp={this.props.signUp} 
        signuppopup={this.props.signuppopup}  
        togglePopupSignup={this.props.togglePopupSignup}
      /></div></div>
    } else {
      return <div><Navbar/><div className="App background-img">
      <Login 
        isLoading= {this.props.loginIsLoading} 
        hasErrored={this.props.loginHasErrored}  
        login={this.props.login} 
        loginpopup={this.props.loginpopup} 
        togglePopupLogin={this.props.togglePopupLogin}
      /></div></div>
    }
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
  signUpIsLoading: PropTypes.bool
}

const mapStateToProps = state => ({
  signuppopup: state.LoginSignupModal.signuppopup,
  loginpopup: state.LoginSignupModal.loginpopup,
  username: state.Login.username,
  isLoggedIn: state.Login.isLoggedIn,
  loginHasErrored: state.Login.loginHasErrored,
  redirectLogin: state.Login.redirectLogin,
  loginIsLoading: state.Login.loginIsLoading,
  signUpHasErrored: state.SignUp.signUpHasErrored,
  signUpIsLoading: state.SignUp.signUpIsLoading
})

export default connect(mapStateToProps, {togglePopupSignup, togglePopupLogin, login, signUp})(App);

