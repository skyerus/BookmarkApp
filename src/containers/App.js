import React, { Component } from 'react';

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {togglePopupSignup, togglePopupLogin} from '../actions/loginSignupModalActions';
import {login, signUp} from '../actions/loginSignUpActions';

import Signup from '../components/Signup';
import Login from '../components/Login';
import JumbotronLS from '../components/ModalLS';
import Navbar from '../components/Navbar';


class App extends Component {
  render() {
    if (!this.props.signuppopup && !this.props.loginpopup){
      return <div><Navbar/><div className="App background-img">
      <JumbotronLS 
        togglePopupSignup={this.props.togglePopupSignup}
        togglePopupLogin={this.props.togglePopupLogin}
      /></div></div>
    } else if (this.props.signuppopup) {
      return <div><Navbar/><div className="App background-img">
      <Signup 
        redirect={this.props.redirectLogin} 
        isLoading= {this.props.signUpIsLoading} 
        hasErrored={this.props.signUpHasErrored} 
        username={this.props.username} 
        isLoggedIn={this.props.isLoggedIn}
        signUp={this.props.signUp} 
        signuppopup={this.props.signuppopup} 
        signupmodal={this.props.signupmodal} 
        togglePopupSignup={this.props.togglePopupSignup}
      /></div></div>
    } else {
      return <div><Navbar/><div className="App background-img">
      <Login 
        isLoading= {this.props.loginIsLoading} 
        redirect={this.props.redirectLogin} 
        hasErrored={this.props.loginHasErrored} 
        username={this.props.username} 
        isLoggedIn={this.props.isLoggedIn} 
        login={this.props.login} 
        loginpopup={this.props.loginpopup} 
        loginmodal= {this.props.loginmodal} 
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
  signupmodal: PropTypes.string,
  loginmodal: PropTypes.string,
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
  signupmodal: state.LoginSignupModal.signupmodal,
  loginpopup: state.LoginSignupModal.loginpopup,
  loginmodal: state.LoginSignupModal.loginmodal,
  username: state.Login.username,
  isLoggedIn: state.Login.isLoggedIn,
  loginHasErrored: state.Login.loginHasErrored,
  redirectLogin: state.Login.redirectLogin,
  loginIsLoading: state.Login.loginIsLoading,
  signUpHasErrored: state.SignUp.signUpHasErrored,
  signUpIsLoading: state.SignUp.signUpIsLoading
})

export default connect(mapStateToProps, {togglePopupSignup, togglePopupLogin, login, signUp})(App);

