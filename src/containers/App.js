import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {togglePopupSignup, togglePopupLogin} from '../actions/loginSignupActions';

import Signup from '../components/Signup';
import Login from '../components/Login';
import JumbotronLS from '../components/JumbotronLS';


class App extends Component {
  render() {
    return (
      <div className="App background-img"> 
        <JumbotronLS jumbotron={this.props.jumbotron} togglePopupSignup={this.props.togglePopupSignup} togglePopupLogin={this.props.togglePopupLogin}/>
        <Signup signuppopup={this.props.signuppopup} signupmodal={this.props.signupmodal} togglePopupSignup={this.props.togglePopupSignup}/>
        <Login loginpopup={this.props.loginpopup} loginmodal= {this.props.loginmodal} togglePopupLogin={this.props.togglePopupLogin}/> 
      </div>
    );
  }
}

App.propTypes = {
  signuppopup: PropTypes.bool,
  togglePopupSignup: PropTypes.func.isRequired,
  togglePopupLogin: PropTypes.func.isRequired,
  signupmodal: PropTypes.string,
  loginpopup: PropTypes.bool,
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

