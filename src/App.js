import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Signup from './components/Signup';
import Login from './components/Login'

import { togglePopupSignup, togglePopupLogin } from './actions/loginSignupActions'


class App extends Component {
  render() {
    return (
        <div className="App background-img">
          <div className= {"modal-bg " + this.props.signupmodal}>
            <Signup/>
          </div>
          <div className= {"modal-bg " + this.props.loginmodal}>
            <Login/>  
          </div>
          <div className= {this.props.jumbotron}>
            <p className="xxsmall">`</p>
            <div className = "my-jumbotron">
              <h1>Bookmarks</h1>
              <p>A place to store all of your bookmarks</p>
              <div className="signup-buttons">
                  <button className="btn btn-dark btn-lg" onClick = {this.props.togglePopupLogin}>Login</button>
                  <button className="btn margin-left btn-dark btn-lg" onClick = {this.props.togglePopupSignup}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

App.propTypes = {
  togglePopupSignup: PropTypes.func.isRequired,
  togglePopupLogin: PropTypes.func.isRequired,
  jumbotron: PropTypes.string,
  modal: PropTypes.string,
}

const mapStateToProps = state => ({
  jumbotron: state.LoginSignup.jumbotron,
  signupmodal: state.LoginSignup.signupmodal,
  loginmodal: state.LoginSignup.loginmodal,
})


export default connect(mapStateToProps, { togglePopupLogin, togglePopupSignup })(App);
