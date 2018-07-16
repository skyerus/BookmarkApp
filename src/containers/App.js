import React, { Component } from 'react';

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {togglePopupSignup, togglePopupLogin} from '../actions/loginSignupActions';

import Signup from '../components/Signup';
import Login from '../components/Login';
import JumbotronLS from '../components/JumbotronLS';
import Navbar from '../components/Navbar';


class App extends Component {
  render() {
    if (!this.props.signuppopup && !this.props.loginpopup){
      return <div><Navbar/><div className="App background-img"><JumbotronLS jumbotron={this.props.jumbotron} togglePopupSignup={this.props.togglePopupSignup} togglePopupLogin={this.props.togglePopupLogin}/></div></div>
    } else if (this.props.signuppopup) {
      return <div><Navbar/><div className="App background-img"><Signup signuppopup={this.props.signuppopup} signupmodal={this.props.signupmodal} togglePopupSignup={this.props.togglePopupSignup}/></div></div>
    } else {
      return <div><Navbar/><div className="App background-img"><Login loginpopup={this.props.loginpopup} loginmodal= {this.props.loginmodal} togglePopupLogin={this.props.togglePopupLogin}/></div></div>
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
  jumbotron: PropTypes.string
}

const mapStateToProps = state => ({
  signuppopup: state.LoginSignup.signuppopup,
  signupmodal: state.LoginSignup.signupmodal,
  loginpopup: state.LoginSignup.loginpopup,
  loginmodal: state.LoginSignup.loginmodal,
  jumbotron: state.LoginSignup.jumbotron
})

export default connect(mapStateToProps, {togglePopupSignup, togglePopupLogin})(App);

